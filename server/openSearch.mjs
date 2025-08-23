import { Client } from "@opensearch-project/opensearch";

export const osClient = new Client({ node: 'http://localhost:9200' })