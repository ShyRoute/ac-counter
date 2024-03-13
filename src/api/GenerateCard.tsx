import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Box from '@mui/material/Box';
import { AutoTextSize } from 'auto-text-size';
import Sites from "./Sites.json";
import './GenerateCard.css';

interface info {
    siteName: string | null,
    handle: string | null,
    solved: number | null,
};

const GenerateCard = () => {
    const [params, _] = useSearchParams();
    const [siteInfo, setSiteInfo] = useState<info[]>([]);

    // const getBOJInfo = async () => {
    //     const url = `https://solved.ac/api/v3/user/show?handle=${bojHandle}`;
    //     const response = await fetch(`https://api-py.vercel.app/?r=${url}`, {
    //         method: "GET"
    //     });
    //     const data = await response.json();
    //     console.log(data);
    // }

    useEffect(() => {
        let newInfo: info[] = [];
        Object.values(Sites).forEach((site) => {
            const siteName = site.name.toLowerCase();
            if(params.has(siteName)) {
                // console.log(site.name, params.get(site.name));
                newInfo.push({
                    siteName: site.name,
                    handle: params.get(siteName),
                    solved: 0
                });
            }
        });
        setSiteInfo(newInfo);
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
                                info.handle === null ? null :
                                <div className="card-site-wrapper">
                                    <img src={"../assets/" + info.siteName?.toLowerCase() + ".png"} style={{width: "20px", height: "20px"}}></img>
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
                        {0}
                    </div>
                </div>
            </Box>
        </>
    );
}

export default GenerateCard;