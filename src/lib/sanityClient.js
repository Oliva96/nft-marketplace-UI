import sanityClient from '@sanity/client';

export const client = sanityClient({
    projectId: 'hfr074gq',
    dataset: 'production',
    apiVersion: '2021-02-12',
    token: 'skMeGx1yhqej1Kg2jCGmUAcVBtWZl9ccKJXBDqx95fZKGPHn9C5NidtTRYsJ5gJ83kQZdauFT26CoG2MWdxVSjUeBOZQzZYkvnxze7DxOOEVvNeOW3YgzVFw5Yj20fG9LLg1rOrxnBMqogKSpwPdZsMUboulk3oJXpKu3JbLsAq75P4O4hDo',
    useCdn: false,
})