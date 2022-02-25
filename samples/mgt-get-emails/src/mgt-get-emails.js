import { Providers, ProviderState } from '@microsoft/mgt';
let provider = Providers.globalProvider;
let mgtEmail = document.querySelector('#mgt-email');

mgtEmail.templateContext = {
    getFormattedDate: (date) => {
        return moment(date).calendar();
    },

    emailClick: (e, context, root) => {
        window.open(context.email.webLink, '_blank', 'noreferrer');
        return false;
    },

    deleteClick: async (e, context, root) => {
        if (provider && provider.state === ProviderState.SignedIn) {
            console.log(`Deleting message: ${context.email.id}`);
            let graphClient = provider.graph.client;
            await graphClient.api(`/me/messages/${context.email.id}/move`).post({
                "destinationId": "deleteditems"
            });
            mgtEmail.refresh(true);
        }
    }
}
