import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, Title);


const Chart = (props: {data: Array<any>, title: string, textInside: string, plan: any}) => {

    const [data, setData] = useState<Array<any>>([]);
    const [title, setTitle] = useState<string>("");
    const [textInside, setTextInside] = useState<string>("");

    useEffect(() => {
        setData(props.data);
        setTitle(props.title);
        setTextInside(props.textInside);
    }, [props.data, props.title, props.textInside]);

    const options = {
        plugins: {
            title: {
                display: false,
                text: title, // use state variable
                font: {
                    size: 14,
                    weight: "500",
                },
                padding:{},
                color: 'black',
            },
        },
        responsive:true,
        animation:{
            animateScale: true,
        },
        cutout: '65%',  // controls the doughnut thickness
    };

    const dataSettings = {
        labels: [],
        title: "Uploaded",
        datasets: [
          {
            data: data, // use state variable
            backgroundColor: [
              '#000000',
              '#F9F6F1',
            ],
            borderColor: [
              '#DCDCDC',
            ],
            borderWidth: 1,
          },
        ],
    };

    
    return (
        <>
            {(textInside && data && title) && <Doughnut key={JSON.stringify(data)} data={dataSettings} options={options}/>}
        </>
    )

    
}

export default Chart;
