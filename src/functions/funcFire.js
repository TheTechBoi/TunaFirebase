import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';



class funcFire{
    
   

    constructor(){
        

    }
    async newUserSetUpDB(){

        const ref = firestore().collection('users')
        
        await ref.doc(auth().currentUser.displayName).set({
            email: auth().currentUser.email,
            ID: auth().currentUser.uid
        })

        await ref.doc(auth().currentUser.displayName).collection("ITEMS").doc("none").set({})

        await ref.doc(auth().currentUser.displayName).collection("friends").doc("none").set({})

        await ref.doc(auth().currentUser.displayName).collection("friendRequests").doc("none").set({})

}
//For ADDİNG FRIEND {=>
    ADDresult = "";

    async addFriend(userName){
        const ref = firestore().collection('users').doc(userName);
        await ref.get().then((docSnap)=>{
            if(docSnap.exists)
            {
                ref.collection("friends").doc(auth().currentUser.displayName).get()
                .then((docSnap_)=>{
                    if(!docSnap_.exists)
                    {
                        ref.collection('friendRequests').doc(auth().currentUser.displayName).set({
                            UserID: auth().currentUser.uid ,
                        })
                        this.ADDresult ="Invite Sent";
                        console.log(this.ADDresult)
                        
                    }
                    else
                    {
                        this.ADDresult ="You're already friends";
                    }
                })
                
            }
            else
            {
                this.ADDresult ="User Not Found";
            }
        })
        

    }
    //For ADDİNG FRIEND <=}
    async acceptFriendRequest(requestNAME){
        const ref_R = firestore().collection('users').doc(requestNAME);
        const ref_U = firestore().collection('users').doc(auth().currentUser.displayName);
        
        await ref_U.collection('friendRequests').doc(requestNAME).delete();
        await ref_U.collection('friends').doc(requestNAME).set({})
        await ref_R.collection('friends').doc(auth().currentUser.displayName).set({})
                    
          
    }

    async cancelFriendRequest(requestNAME){
        const ref_U = firestore().collection('users').doc(auth().currentUser.displayName);
        await ref_U.collection('friendRequests').doc(requestNAME).delete();
    }

}

export default new funcFire();