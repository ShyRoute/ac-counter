import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Box from '@mui/material/Box';
import Sites from "./Sites.json";
import './GenerateCard.css';
//@ts-ignore
import { AutoTextSize } from 'auto-text-size';

interface info {
    siteName: string | null,
    handle: string | null,
    solved: number
};

const GenerateCard = () => {
    const [params, _] = useSearchParams();
    const [siteInfo, setSiteInfo] = useState<info[]>([]);
    const [totalSolvedCount, setTotalSolvedCount] = useState<number>(0);

    // const getBOJInfo = async () => {
    //     const url = `https://solved.ac/api/v3/user/show?handle=${bojHandle}`;
    //     const response = await fetch(`https://api-py.vercel.app/?r=${url}`, {
    //         method: "GET"
    //     });
    //     const data = await response.json();
    //     console.log(data);
    // }

    const getSolvedCount = async (siteName: string, handle: string | null, url: string, ) : Promise<number> => {
        const res = await fetch(url + handle, {
            method: "GET"
        });
        const data = await res.json();
        // console.log(data);

        if(siteName === "boj") {
            return data.solvedCount;
        } else if(siteName === "codeforces") {
            const set = new Set();
            for(let i of data.result) {
                if(i.verdict === "OK") set.add(i.problem.contestId + i.problem.index);
            }
            return set.size;
        } else if(siteName === "atcoder") {
            return data.count;
        }

        return 0;
    };

    useEffect(() => {
        let newInfo: info[] = [];
        let totalSolvedCount = 0;
        (async () => {
            for(let site of Object.values(Sites) as { name: string; url: string; }[]){
                const siteName = site.name.toLowerCase();
                if(params.has(siteName) && params.get(siteName) !== "") {
                    const handle = params.get(siteName);
                    const solved = await getSolvedCount(siteName, handle, site.url);
                    totalSolvedCount += solved;
                    newInfo.push({
                        siteName: site.name,
                        handle: handle,
                        solved: solved
                    });
                }
            }

            setSiteInfo(newInfo);
            setTotalSolvedCount(totalSolvedCount);
        })();
    }, []);

    return (
        <>
            <Box
                height={170}
                width={350}
                display="flex"
                alignItems="center"
                justifyContent={"space-between"}
                fontFamily="Pretendard"
                sx={{ border: '2px solid grey' }}
            >
                <div className="card-sites-wrapper">
                    {
                        siteInfo.map((info) => {
                            return (
                                info.handle === "" ? null :
                                <div className="card-site-wrapper">
                                    <img src={"/assets/" + info.siteName?.toLowerCase() + ".png"} style={{width: "20px", height: "20px"}}></img>
                                    <div style={{width: "120px", marginLeft: "10px"}}>
                                        <AutoTextSize maxFontSizePx={16}>{info.handle}</AutoTextSize>
                                    </div>
                                    <div style={{marginLeft: "10px"}}>{info.solved}</div>
                                </div>
                            )
                        })
                    }
                </div>

                <div className="card-count-wrapper">
                    Total solved
                    <div className="card-count">
                        {totalSolvedCount}
                    </div>
                </div>
            </Box>
        </>
    );
}

export default GenerateCard;