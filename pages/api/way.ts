import { NextApiRequest, NextApiResponse } from "next";
const way = [
    {
        url: "baidu.com",
        name: '百度',
        id: "1",
    },
    {
        url: "google.com",
        id: "2",
        name: '谷歌',
    },
    {
        url: "sogo.com",
        id: "3",
        name: '搜狗',
    },
    {
        url: "360.cn",
        id: "4",
        name: '360',
    },
    {
        url: "qq.com",
        id: "5",
        name: '腾讯',
    },
];
type Item = {
    url: string;
    text: string;
    id: string;
};
class Cache {
    ways: any[] = way;
    push(item: Item) {
        let id: string = String(parseInt(String(Math.random() * 8100)));
        let ids = this.ways.map(way => way.id)
        while (ids.includes(id)) {
            id = String(parseInt(String(Math.random() * 8100)));
        }
        this.ways.push({ ...item, id, text: '腾讯一下' });
    }
    remove(id: number) {
        const ways = this.ways;
        this.ways = ways.filter((item) => item.id !== id);
    }
    update(item: Item) {
        console.log(item, 888)
        const ways = this.ways;
        this.ways = ways.map((way) =>
            way.id === item.id ? { ...way, ...item } : way
        );
    }
    get() {
        return this.ways;
    }
}
const data = new Cache();
export default function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log(req.body)
    if (req.method === "GET") {
        return res.status(200).json(data.get());
    }
    if (req.method === "POST") {
        data.push(JSON.parse(req.body));
        return res.status(200).json(data.get());
    }
    if (req.method === "PUT") {
        data.update(JSON.parse(req.body));
        return res.status(200).json(data.get());
    }
    if (req.method === "DELETE") {
        data.remove(JSON.parse(req.body).id);
        return res.status(200).json(data.get());
    }
}
