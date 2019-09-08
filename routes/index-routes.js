const express = require('express');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const Consulta = mongoose.model('Consulta');


const { KubeConfig } = require('kubernetes-client')
const kubeconfig = new KubeConfig()
kubeconfig.loadFromFile('/home/joao.souza/.bluemix/plugins/container-service/clusters/27aa7fb64fee45029ec7465f33e8927b/kube-config-sao01-LIVSAO01.yml')
const Request = require('kubernetes-client/backends/request')
const backend = new Request({ kubeconfig })

const Client = require('kubernetes-client').Client
const opa = new Client({ backend, version: '1.13' })


router.get('/', (req, res) => {
    res.render('form', { title: 'Consulta Pod' });
});

router.post('/', [
        body('pod')
        .isLength({ min: 1 })
        .withMessage('Please enter pod name'),
    ],
    (req, res) => {
        console.log(req.body.pod);
        console.log(req.body.namespace);
        getPods(req.body.namespace, req.body.pod).then((result) => {
            console.log("result: ", result);
        })
        res.render('form', { title: 'Consulta Pod' });
    });

async function getPods(namespace, name) {
    try {
        console.log(namespace, name);
        console.log(opa)
        const pods = await opa.api.v1.namespaces(namespace).pods(name).status.get()

        console.log(pods)
        return pods;
    } catch (err) {
        console.error('Error: ', err)
    }
}

router.get('/opa', function(req, res) {
    return require("../src/pod-logs")
    console.log("ops");
});


module.exports = router;