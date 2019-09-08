//
// Retrieve logs for a pod.
//
var express = require('express');
var app = express();
const { KubeConfig } = require('kubernetes-client')
const kubeconfig = new KubeConfig()
kubeconfig.loadFromFile('/home/joao.souza/.bluemix/plugins/container-service/clusters/27aa7fb64fee45029ec7465f33e8927b/kube-config-sao01-LIVSAO01.yml')
const Request = require('kubernetes-client/backends/request')
const backend = new Request({ kubeconfig })
const router = express.Router();

const Client = require('kubernetes-client').Client
const opa = new Client({ backend, version: '1.13' })


const config = require('kubernetes-client/backends/request')

async function main() {
    try {
        var namespace = 'infra'
        var name = 'swagger-ui-8c7ff558d-wfxkn'

        // Pod with single container
        // let logs = await opa.api.v1.namespaces('default').pods.get()
        // console.log(logs.body)

        console.log(opa)



        const pods = await opa.api.v1.namespaces(namespace).pods(name).status.get()
            //pods.body.items.forEach((item) => {
        console.log(pods) //.metadata)
            //})

        // Pod with multiple containers
        // logs = await client.api.v1.namespaces('namespace_name').pods('pod_name').log.get({
        //     qs: {
        //         container: 'container_name'
        //     }
        // })
        // console.log(logs.body)
    } catch (err) {
        console.error('Error: ', err)
    }
}

main()
module.exports = router;