//
// Retrieve logs for a pod.
//
var express = require('express');
var app = express();
const { KubeConfig } = require('kubernetes-client')
const kubeconfig = new KubeConfig()
kubeconfig.loadFromFile('path/')
const Request = require('kubernetes-client/backends/request')
const backend = new Request({ kubeconfig })

const Client = require('kubernetes-client').Client
const opa = new Client({ backend, version: '1.13' })


const config = require('kubernetes-client/backends/request')

async function main() {
    try {

        // Pod with single container
        let logs = await opa.api.v1.namespaces('--all-namespaces').pods.get()
        console.log(logs.body)

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