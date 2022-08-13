import awsExports from "../aws-exports";

export const awsConfig = {
    ...awsExports,
    API: {
        endpoints: [
            {
                name: "done-registration-service",
                endpoint: "https://14an1bejie.execute-api.us-east-1.amazonaws.com/registration"
            },
        ]
    }
};