import cookie from "cookie";
import { parse } from "cookie";

const cookies = parse(req.headers.cookie || '');
const authToken = cookies.authToken;


const handler = (req,res) => {
    
    console.log(authToken);
    if(req.method === "POST")
    {
        const{username,password} = req.body;
        if(
        username === process.env.ADMIN_USERNAME && 
        password === process.env.ADMIN_PASSWORD
        ){
            res.setHeaders(
                "Set-Cookie",
                cookie.serialize("token", process.env.TOKEN, {
                    SameSite : "None",
                    secure : "true",
                    maxAge : 60 * 60,
                    sameSite : "strict",
                    path : "/",
                    })
                );
                res.status(200).json("Successfull");
        }else {
            res.status(400).json("Wrong Credentials !");
        }
    }
};


export default handler;