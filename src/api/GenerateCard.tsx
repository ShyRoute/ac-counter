import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Box from '@mui/material/Box';
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
                                <div className="card-site-wrapper">
                                    <div style={{width: "100px  "}}>{info.siteName}</div>
                                    <div style={{width: "50px"}}>{info.handle}</div>
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