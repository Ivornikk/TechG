import { Client } from "@opensearch-project/opensearch";

export const osClient = new Client({ node: 'http://192.168.1.2:9200' })