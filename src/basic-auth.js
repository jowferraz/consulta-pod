var express = require('express');
var app = express();
const { KubeConfig } = require('kubernetes-client')
const kubeconfig = new KubeConfig()
kubeconfig.loadFromFile('/home/')
const Request = require('kubernetes-client/backends/request')
const backend = new Request({ kubeconfig })

const Client = require('kubernetes-client').Client

async function main() {
    try {
        const client = new Client({
            config: {
                url: process.env.K8S_CLUSTER_HOST,
                auth: {
                    user: process.env.K8S_USER,
                    pass: process.env.K8S_PASSWORD
                },
                insecureSkipTlsVerify: true
            },
        })

        //
        // Fetch all the pods
        const pods = await client.api.v1.pods.get()
        pods.body.items.forEach((item) => {
            console.log(item.metadata)
        })

        //
        // Fetch the Deployment from the kube-system namespace.
        //
        const deployment = await client.apis.apps.v1.namespaces('kube-system').deployments().get()
        deployment.body.items.forEach((item) => {
            console.log(item.metadata)
        })
    } catch (err) {
        console.error('Error: ', err)
    }
}

main()