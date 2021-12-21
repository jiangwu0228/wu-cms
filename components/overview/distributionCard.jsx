import Highcharts from "highcharts/highmaps";
import HighchartsReact from "highcharts-react-official";

const DistributionCard = (props) => {
  const { data, title, world } = props;

  const mapSource = data?.map((item) => {
    const target = world.data.features.find(
      (feature) =>
        item.name.toLowerCase() === feature.properties.name.toLowerCase()
    );

    return !!target
      ? {
          "hc-key": target.properties["hc-key"],
          value: item.amount,
        }
      : {};
  });

  const options = {
    colorAxis: {
      min: 0,
      stops: [
        [0, "#fff"],
        [
          0.5,
          typeof Highcharts === "object"
            ? Highcharts.getOptions().colors[0]
            : "",
        ],
        [1, "#1890ff"],
      ],
    },
    legend: {
      layout: "vertical",
      align: "left",
      verticalAlign: "bottom",
    },
    credits: {
      enabled: false,
    },
    exporting: {
      enabled: false,
    },
    title: {
      text: `<span style="text-transform: capitalize">${title
        .split(/(?=[A-Z])/)
        .join(" ")}</span>`,
    },
    series: [
      {
        data: mapSource,
        mapData: world.data,
        name: "Total",
        states: {
          hover: {
            color: "#a4edba",
          },
        },
      },
    ],
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      constructorType={"mapChart"}
      options={options}
    />
  );
};

export default DistributionCard;
