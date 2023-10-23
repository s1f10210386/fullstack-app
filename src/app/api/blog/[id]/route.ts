import { NextResponse } from "next/server";
import { main } from "../route";
import { PrismaClient } from "@prisma/client";
import { reportWebVitals } from "next/dist/build/templates/pages";


//インスタンス化
const prisma =new PrismaClient();

//ブログの詳細記事取得API
export const GET = async (req:Request,res:NextResponse) =>{
    try{
        //http://localhost:3000/api/blog/3 のうち/3の部分だけ撮ってきてidに指定したい。。！
        //splitでhttp~blog/と/3の２つの配列にスプリット！->3は1番目なので[1]で配列指定する。
        const id:number =parseInt(req.url.split("/blog/")[1]);
        
        await main(); //main呼出し

        const post= await prisma.post.findFirst({where: {id}});//今回は一つなのでfindFirst
        
        //今まではres.status
        return NextResponse.json({message: "Success",post}, {status:200});

    } catch (err){
        return NextResponse.json({message:"Error",err},{status:500})
    } finally {
        //いずれにせよ接続止める
        await prisma.$disconnect();
    }
}; 


//ブログの記事編集API
export const PUT = async (req:Request,res:NextResponse) =>{
    try{

        const id:number =parseInt(req.url.split("/blog/")[1]);
        
        const {title,description} = await req.json();

        await main(); //main呼出し

        const post= await prisma.post.update({
            data:{title,description},
            where: {id},
        });
        
        //今まではres.status
        return NextResponse.json({message: "Success",post}, {status:200});

    } catch (err){
        return NextResponse.json({message:"Error",err},{status:500})
    } finally {
        //いずれにせよ接続止める
        await prisma.$disconnect();
    }
}; 


//削除用API
export const DELETE = async (req:Request,res:NextResponse) =>{
    try{

        const id:number =parseInt(req.url.split("/blog/")[1]);
        
        //const {title,description} = await req.json(); 必要なし

        await main(); //main呼出し

        const post= await prisma.post.delete({
            where:{id},
        });
        
        //今まではres.status
        return NextResponse.json({message: "Success",post}, {status:200});

    } catch (err){
        return NextResponse.json({message:"Error",err},{status:500})
    } finally {
        //いずれにせよ接続止める
        await prisma.$disconnect();
    }
}; 