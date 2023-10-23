"use client";

import { useRouter } from 'next/navigation';
import React from 'react'
import { useRef } from "react";
import toast, { ToastBar, Toaster } from 'react-hot-toast';

//APIたたくための関数(ドアをたたくイメージ)
const postBlog = async (title: string | undefined, description: string | undefined) => {
    const res = await fetch('http://localhost:3000/api/blog', {
        method: "POST",
        body: JSON.stringify({ title, description }), //titleではなくJSON形式で送りたい
        headers: {
            "Content-Type":"application.json",
        }
    });
    return res.json();
}


//この２つの情報を加味したうえでAPIたたくと情報を投稿できる
const PostBlog = () => {
    const router = useRouter(); //自動で戻る様に
    //useRef:そのプロパティの属性を取得
    const titleRef = useRef< HTMLInputElement | null>(null);
    const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
    

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); //リロード防止のためらしい・・？

        toast.loading(("投稿中です。。。"),{id:"1"});
        await postBlog(titleRef.current?.value, descriptionRef.current?.value); //postBlogが行われres返ってくる
        toast.success(("投稿に成功しました!"),{id:"1"});

        router.push("/");//これで投稿したら自動でホーム戻る
        router.refresh();

    };

    return (
        <>
            <Toaster/>
            <div className="w-full m-auto flex my-4">
                <div className="flex flex-col justify-center items-center m-auto">
                    <p className="text-2xl text-slate-200 font-bold p-3">ブログ新規作成 🚀</p>
                    <form onSubmit={handleSubmit}> {/*投稿ボタン押したときに取得したい*/}
                        <input
                            ref={titleRef}
                            placeholder="タイトルを入力"
                            type="text"
                            className="rounded-md px-4 w-full py-2 my-2"
                        />
                        <textarea
                            ref={descriptionRef}
                            placeholder="記事詳細を入力"
                            className="rounded-md px-4 py-2 w-full my-2"
                        ></textarea>
                        <button className="font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100">
                            投稿
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default PostBlog;