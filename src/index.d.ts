declare module "react-firebase-web-auth" {
    import { Component } from "react";

    export interface FirebaseWebAuthProps {
        uiConfig: any;
        firebaseAuth: any;
    }

    export default class StyledFirebaseAuth extends Component<FirebaseWebAuthProps> {}
}