import { Client } from "@opensearch-project/opensearch";

export const osClient = new Client({ node: 'http://opensearch:9200' })