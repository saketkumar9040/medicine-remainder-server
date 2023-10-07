import dotenv from "dotenv";
import FCM from "fcm-node";
dotenv.config();

const fcm = new FCM(process.env.FCM_SERVER_KEY)

export const sendPushNotification = async (serverKey,messageText) => {
  try {

    let message = {
        to: serverKey, 
        notification: {
            title: 'Its medicine time ', 
            body: messageText,
            data:{
                icon:"https://firebasestorage.googleapis.com/v0/b/medicine-remainder-app-bc9e9.appspot.com/o/icon.png?alt=media&token=ec119305-d3c6-40c9-bbe2-ab1590b4a32b&_gl=1*84kt8x*_ga*MjAxMTA2MDE5My4xNjgzNjI2NzA4*_ga_CW55HF8NVT*MTY5NjY3MjYxNi4yMzMuMS4xNjk2NjczMjMzLjYwLjAuMA..",
                sound:"https://firebasestorage.googleapis.com/v0/b/medicine-remainder-app-bc9e9.appspot.com/o/notification.mp3?alt=media&token=a43c3f72-0565-426d-b24f-55e0c62345c4&_gl=1*17tw7ef*_ga*MjAxMTA2MDE5My4xNjgzNjI2NzA4*_ga_CW55HF8NVT*MTY5NjY3MjYxNi4yMzMuMS4xNjk2NjczNjIzLjUwLjAuMA.."
            }
        }
    };

    fcm.send(message,(error,result)=>{
      if(error){
        return error.message;
      }else{
        return result;
      }
    })


  } catch (error) {
    throw new Error(error.message);
  }
};
