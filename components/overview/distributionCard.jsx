import Highcharts from "highcharts/highmaps";
import HighchartsReact from "highcharts-react-official";
import { useState, useEffect } from "react";
import { getWorld } from "../../pages/api/api-services";

const DistributionCard = (props) => {
  const { data, title, world } = props;
  // console.log("data", data);
  // console.log(title);
  // console.log("world", world);

  const mapSource = data.map((item) => {
    // console.log("item", item.name);
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
        [0.5, Highcharts.getOptions().colors[0]],
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
    // chart: {
    //   map: 'custom/world',
    // },
    series: {
      data: mapSource,
      mapData: world.data,
      name: "Total",
      states: {
        hover: {
          color: "#a4edba",
        },
      },
    },
  };

  // console.log("options", options);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      constructorType={"mapChart"}
      options={options}
    />
  );
};

export default DistributionCard;
