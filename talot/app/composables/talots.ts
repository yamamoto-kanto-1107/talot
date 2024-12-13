interface Luck {
    title: string;
    normal: string[];
    reverse: string[];
}

interface TalotContent {
    total: Luck;
    love: Luck;
    work: Luck;
    money: Luck;
    health: Luck;
}

interface Talot {
    id: number;
    no: string | number;
    category1: string;
    category2: string;
    name: string;
    img: string;
    background: Luck | {confirm: string};
    imgContent: string;
    imgContent2: string;
    imgContent3: string;
    contents: TalotContent;
}

//新規追加の画像があった場合に一時的に保管しておく
const newImg = ref('')

export const useTalot = ()=>{
//     const talots: Talot[] = [
//         {
//             id: 1,
//             no: 0,
//             category1:'大アルカナ',
//             category2:'なし',
//             name: "愚者",
//             img:'fool.jpeg',
//             background:{
//                 title:'-このカードの背景-',
//                 confirm:'旅行中の王子が空を見つめ前進を続けています。\nしかし、一歩先には断崖絶壁があり、それに続いていません。\nしかし、踏み外して宙に浮いていても、天使が支えてくれるのです。\n「愚者はトランプのジョーカーと繋がりがあり、独特な特別感を持ちます。」',
//                 // normal:'枠のない、自由奔放な行動\n未知の世界に飛び込む冒険心\n純粋無垢な精神を持つ\n未来が未確定の時に出ることも\n周りはやめておけとバカにしている',
//                 // reverse:`無計画で愚かな行動\nコロコロ変わる、不安定な状況\n根なし草のような生活\n深く考えてない。無責任的`
//                 normal:['枠のない、自由奔放な行動','未知の世界に飛び込む冒険心','純粋無垢な精神を持つ','未来が未確定の時に出ることも','周りはやめておけとバカにしている'],
//                 reverse:['無計画で愚かな行動','コロコロ変わる、不安定な状況','根なし草のような生活','深く考えてない。無責任的']
//             },
//             imgContent:`旅行中の異世界の王子
// 恍惚とした表情で空を見つめ、前進を続けています。\nしかし、一歩先には、断崖絶壁があり、それに気づいていません。\n風変わりな服装のこの放浪者の心の中は、新しい体験への希望に満ちています。`,
//             imgContent2:`危険に気づかない王子\n彼は恍惚として点を見つめ、未来を夢に見ています。\n無邪気に冒険を重ね、自由奔放に生きることを望んでいるのです。`,
//             imgContent3:`足元にいる友達の犬\n彼が危険であることを必死に伝えています`,
//             contents: {
//                 total: {
//                     title:'-全体運-\n（対人関係、その他）',
//                     normal:['・人目を気にせず、自由に行動する','・話から外れて単独行動を起こす','・周囲から浮いた奇抜な存在','・一人旅で精神的充足感を得る','・未来の結果が確定していない状態'],
//                     reverse:['・人への言動がコロコロ変わる','・平気で嘘をつき信頼を失う','・気ままに人と接する不誠実な態度','・計画性ののない思いつきでの言動','・物事が白紙状態になる'],
//                 },
//                 love:{
//                     title:'-恋愛運-',
//                     normal:['・恋愛に無関心な状態','・理想の恋を求めてさまよい続ける','・無謀な恋愛に体当たりし、状況が見えていない','・行き当たりばったりの恋愛','・追われるより追う恋愛を選ぶ'],
//                     reverse:['・コロコロと変わりやすい恋愛感情','・思いつきで無計画に進める恋愛','・その場限りの責任感のない恋愛','・恋人なのかはっきりしない関係','・無意味に恋愛遍歴を重ねる'],
//                 },
//                 work:{
//                     title:'-仕事運-',
//                     normal:['・理想の仕事を探し始める','・フリーランスの仕事で活躍する','・フリーターとして活躍する','・稼働や変動の多い職業','・その場の状況に流される仕事運'],
//                     reverse:['・適職がわからず、転職や職種が複数ある','・定職につけない不安定な仕事運','・長く続けられないアルバイト','・仕事につかず、ニート生活を送る','・就きたい職種がコロコロと変わる'],
//                 },
//                 money:{
//                     title:'-金運-',
//                     normal:['・質素な生活でも満足できる','・株などの投資が成功する','・金銭運用に対して無頓着な状態','・出入りが激しい金銭状態','・何かの受賞などで大金が入る'],
//                     reverse:['・貯蓄や金銭運用に無関心な状態','・欲望のまま湯水のように散財する','・カードローンや借金を重ねる','・株などの投資で失敗する','・どんぶり勘定の金銭感覚を持ち、出入りが多い状態'],
//                 },
//                 health:{
//                     title:'-健康運-',
//                     normal:['・積極的に体を動かし健康体を維持','・意識しないことが健康につながる','・海外の健康法がフィットする','・ダイエットが成功する','・楽しく過ごすことが健康の秘訣'],
//                     reverse:['・変わりやすい不安定な体調','・不規則な生活が元で体調を崩す','・暴飲暴食を繰り返す','・間違った運動法、健康法を続けてしまう','・診断ミスを受けやすい状態']
//                 },
//             }
//         },
//    ];

    const defaultItem: Talot = {
        id: 0,
        no: "",
        category1: "",
        category2: "",
        name: "",
        img: "",
        background: {
            title: "-このカードの背景-",
            normal: [""],
            reverse: [""],
            confirm: "",
        },
        imgContent: "",
        imgContent2: "",
        imgContent3: "",
        contents: {
            total: {
                title: "-全体運-\n（対人関係、その他）",
                normal: [""],
                reverse: [""],
            },
            love: {
                title: "恋愛運",
                normal: [""],
                reverse: [""],
            },
            work: {
                title: "仕事運",
                normal: [""],
                reverse: [""],
            },
            money: {
                title: "金運",
                normal: [""],
                reverse: [""],
            },
            health: {
                title: "健康運",
                normal: [""],
                reverse: [""],
            },
        },
    }

    //supabaseの情報
    const supabase = useNuxtApp().$supabase
    const talots = ref<Talot[]>([]);

    //talotのデータ取得(supabase)
    const fetchTalots = async () =>{
        const {data, error} = await supabase
            .from('talots')
            .select('id , no, img , category1, category2, name, background, imgContent, imgContent2, imgContent3, contents')
            .order('category1',{ascending:true})
            .order('category2',{ascending:true})
            .order('no',{ascending:true})
        if (error){
            console.log(error)
        }else{
            const sortData = data.map(item=>({
                ...item,
                contents:{
                    total:item.contents.total,
                    love:item.contents.love,
                    work:item.contents.work,
                    money:item.contents.money,
                    health:item.contents.health
                }
            }))
            talots.value = sortData || []
        }
    }

    //取得したデータを返す
    const getTalots = async function(){
        await fetchTalots()
        return talots.value
    };

    //プレビューの定義
    let preview = useState<Talot>("preview", () =>
        JSON.parse(JSON.stringify(defaultItem)),
    );

    //IDからタロットの情報を取得する
    const getters = async function(id : number) {
        await fetchTalots()
        return talots.value.find(v => v.id == id)
    }

    //プレビューにデータを与える
    const actions = {
        setPreview: (talot: Talot = defaultItem) => preview.value = JSON.parse(JSON.stringify(talot)),
    }

    //画像の新規追加があった場合に、一時的に保存しておく（URL）
    const setPreviewImg = (imgUrl: string) =>{
        newImg.value = imgUrl
    }
    //画像の新規追加があった場合の、画像を再度取得する（画面遷移した時用）
    const getPreviewImg = () =>{
        if(!newImg.value){
            console.log('none')
        }else{
            return newImg.value
        }
    }
    //カードマスタ画面に遷移した時に保管した画像を消す
    const clear = () =>{
        newImg.value = ''
    }


    //タロットの削除
    const deleteItem = async function(id:number){
        const {data:deleteData,error:deleteError} = await supabase
            .from('talots')
            .delete()
            .eq('id',id)
        if(deleteError){
            console.log(`deleteError::${deleteData}`)
        }else{
            return true
        }
    }

    //タロットの挿入
    const insertTalotInfo = async function (readimg:Object,judge:boolean){

        if(preview.value.id === 0){
            //新規追加処理

            //画像の保存先
            const fileName = preview.value.img
            const filePath = `images/${fileName}`

            try{
                if(readimg && readimg instanceof Blob){
                    const {data:insertImg,error:insertImgError} = await supabase.storage
                    .from('TalotImages')
                    .upload(filePath,readimg, {
                        upsert: true,
                    })
                    if(insertImgError){
                        console.log(insertImgError)

                    }
                }
            }catch(error){
                console.log(error)
                return
            }
            const { data:imgUrl } = supabase
                .storage
                .from('TalotImages')
                .getPublicUrl(filePath)

            const { data:maxIdData, error:idError } = await supabase
                .from('talots')
                .select('id')
                .order('id',{ascending:false})
                .limit(1)
            if (idError){
                console.log(`idError:::${idError}`)
            }

            const maxId = (maxIdData && maxIdData.length > 0) ? maxIdData[0].id : 0;
            const nextId = maxId + 1;

            const {data:insertData,error:insertError} =await supabase
                .from('talots')
                .insert([
                    {
                        category1:preview.value.category1,
                        category2:preview.value.category2,
                        name:preview.value.name,
                        background:preview.value.background,
                        imgContent:preview.value.imgContent,
                        imgContent2:preview.value.imgContent2,
                        imgContent3:preview.value.imgContent3,
                        contents:preview.value.contents,
                        no:preview.value.no,
                        img:imgUrl.publicUrl,
                    }
                ])
            if(insertError){
                console.log(insertError)
                return false
            }else{
                return true
            }
        }else{
            //既存のデータの編集
            if (judge){
                const fileName = preview.value.img
                const filePath = `images/${fileName}`

                try{
                    if(readimg && readimg instanceof Blob){
                        const {data:insertImg,error:insertImgError} = await supabase.storage
                        .from('TalotImages')
                        .upload(filePath,readimg, {
                            upsert: true,
                        })
                        if(insertImgError){
                            console.log(insertImgError)

                        }
                    }
                }catch(error){
                    console.log(error)
                    return
                }
                const { data:imgUrl } = supabase
                    .storage
                    .from('TalotImages')
                    .getPublicUrl(filePath)

                const {data:editData, error:editError} = await supabase
                .from('talots')
                .update([
                    {
                        category1:preview.value.category1,
                        category2:preview.value.category2,
                        name:preview.value.name,
                        background:preview.value.background,
                        imgContent:preview.value.imgContent,
                        imgContent2:preview.value.imgContent2,
                        imgContent3:preview.value.imgContent3,
                        contents:preview.value.contents,
                        no:preview.value.no,
                        img:imgUrl.publicUrl,
                    }
                ])
                .eq('id',preview.value.id)

                if(editError){
                    console.log(editError)
                    return false
                }else{
                    return true
                }
            }else{
                const {data:editData, error:editError} = await supabase
                .from('talots')
                .update([
                    {
                        category1:preview.value.category1,
                        category2:preview.value.category2,
                        name:preview.value.name,
                        background:preview.value.background,
                        imgContent:preview.value.imgContent,
                        imgContent2:preview.value.imgContent2,
                        imgContent3:preview.value.imgContent3,
                        contents:preview.value.contents,
                        no:preview.value.no,
                    }
                ])
                .eq('id',preview.value.id)

                if(editError){
                    console.log(editError)
                    return false
                }else{
                    return true
                }
            }

        }
    }

    return {
        talots,
        preview: preview.value,
        getters,
        getTalots,
        insertTalotInfo,
        deleteItem,
        setPreviewImg,
        getPreviewImg,
        clear,
        ...actions,
    }
}