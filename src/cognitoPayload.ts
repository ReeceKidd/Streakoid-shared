interface CognitoPayload {
    idToken: string;
    idTokenExpiryTime: number;
    accessToken: string;
    refreshToken: string;
    username: string;
}

export default CognitoPayload;
