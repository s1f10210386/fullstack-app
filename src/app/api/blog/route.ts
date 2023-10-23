//今まではindex.ts

import { Prisma, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

//データベースに接続するための関数
export async function main(){
    try{
      await prisma.$connect();
    } catch (err){
        return Error("DB接続に失敗しました");
    }
}


//ブログの全記事取得API
export const GET = async (req:Request,res:NextResponse) =>{
    try{
        await main(); //main呼出し

        //supabaseのデータベースの中からブログ記事を取得
        const posts = await prisma.post.findMany();//postというスキーマのモデルからfindMany(全記事取得)する
        
        //今まではres.status
        return NextResponse.json({message: "Success",posts}, {status:200});

    } catch (err){
        return NextResponse.json({message:"Error",err},{status:500})
    } finally {
        //いずれにせよ接続止める
        await prisma.$disconnect();
    }
};


//ブログの投稿用API
export const POST = async (req:Request,res:NextResponse) =>{
    try{
        //titleとdescriptionはreqに入ってるからそこから取り出す(今まではreq.body->req.json)
        const {title,description} = await req.json();
       
        await main(); //main呼出し

        //投稿
        const post = await prisma.post.create({data:{title,description}});//idは自動的につく

        //今まではres.status
        return NextResponse.json({message: "Success",post}, {status:201});

    } catch (err){
        return NextResponse.json({message:"Error",err},{status:500})
    } finally {
        //いずれにせよ接続止める
        await prisma.$disconnect();
    }
};