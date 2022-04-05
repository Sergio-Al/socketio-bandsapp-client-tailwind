import React, { useContext, useEffect } from "react";
import { Chart, registerables } from "chart.js";
import { SocketContext } from "../context/SocketContext";

// Register a chart
Chart.register(...registerables);

const BandChart = () => {
  let myGraph = null;
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket.on("current-bands", (bands) => {
      createGraph(bands);
    });
  }, [socket]);

  const createGraph = (bands = []) => {
    const ctx = document.getElementById("myChart");
    // We must destroy the graph if exists
    if (myGraph) myGraph.destroy();
    myGraph = new Chart(ctx, {
      type: "polarArea",
      data: {
        labels: bands.map((band) => band.name),
        datasets: [
          {
            axis: "y",
            label: "# of Votes",
            data: bands.map((band) => band.votes),
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
            // some options goes here!
        },
        animation: false,
      },
    });
  };

  return <canvas id="myChart" className="max-w-4xl max-h-96"></canvas>;
};

export default BandChart;
