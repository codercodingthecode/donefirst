import { Amplify } from 'aws-amplify';

Amplify.configure({
    API: {
        endpoints: [
            {
                name: "DoneAPI",
                endpoint: "https://14an1bejie.execute-api.us-east-1.amazonaws.com/registration"
            },
        ]
    }
});