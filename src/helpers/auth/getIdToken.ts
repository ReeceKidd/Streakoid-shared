import Amplify, { Auth } from 'aws-amplify';

Amplify.configure({
    Auth: {
        mandatorySignIn: true,
        region: 'eu-west-1',
        userPoolId: 'eu-west-1_jzNG2ske9',
        userPoolWebClientId: '68agp8bcm9bidhh4p97rj1ke1g',
    },
});

export const getIdToken = async () => {
    const session = await Auth.currentSession();
    if (session) {
        return session.getIdToken().getJwtToken();
    }
    return null;
};
