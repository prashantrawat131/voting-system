import { useState } from "react";
import { PieChart, Pie, Cell } from "recharts";

function Poll(props) {
  const [selected, setSelected] = useState(-1);
  const style = { backgroundColor: "green" };
  const noStyle = {};
  const pollCreationDate = new Date(props.pollData.date);
  const [pollState, setPollState] = useState(0);

  // calculatePercentages();

  const data = [
    { name: "Group A", value: props.pollData.option1_votes },
    { name: "Group B", value: props.pollData.option2_votes },
    { name: "Group C", value: props.pollData.option3_votes },
    { name: "Group D", value: props.pollData.option4_votes },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  function getSelected() {
    const url =
      "/getSelected?poll_id=" +
      props.pollData._id +
      "&voter_email=" +
      props.username;
    // console.log("Url: "+url);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const optionSelected = data.optionSelected;
        setSelected(optionSelected);
      });
  }

  getSelected();

  function optionClicked(poll_id, optionNumber) {
    // console.log("Poll id: " + poll_id + "\toption number: " + optionNumber);
    const lastSelectedOptionNumber = selected;
    setSelected(optionNumber);
    fetch("/vote", {
      method: "POST",
      headers: { "Content-type": "application/json;charset=UTF-8" },
      body: JSON.stringify({
        poll_id,
        optionNumber,
        voter_email: props.username,
        lastSelectedOptionNumber,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        props.refreshPoll(poll_id);
      });
  }

  return (
    <div className="card mx-auto poll">
      <div className="card-body">
        <div className="row">
          <div hidden={pollState !== 0} className="col-6 container poll-div">
            <div className="row poll-creator-name-div">
              <div className="col">{props.pollData.creator}</div>
              <div className="col">
                <div className="date-div">
                  Date: {pollCreationDate.getDate()}/
                  {pollCreationDate.getMonth()}/{pollCreationDate.getFullYear()}
                </div>
                <div className="time-div">
                  Time: {pollCreationDate.getHours()}:
                  {pollCreationDate.getMinutes()}
                </div>
              </div>
            </div>
            <hr />
            <div className="row">
              <p>{props.pollData.poll_title}</p>
            </div>
            <div className="row">
              <div
                className="col option"
                style={selected === 1 ? style : noStyle}
                onClick={() => optionClicked(props.pollData._id, 1)}
              >
                {props.pollData.option1}
              </div>
              {/* <div className="percent-div">{percents[0]}</div> */}

              <div
                className="col option"
                style={selected === 2 ? style : noStyle}
                onClick={() => optionClicked(props.pollData._id, 2)}
              >
                {props.pollData.option2}
              </div>
            </div>
            <div className="row">
              <div
                className="col option"
                style={selected === 3 ? style : noStyle}
                onClick={() => optionClicked(props.pollData._id, 3)}
              >
                {props.pollData.option3}
              </div>
              <div
                className="col option"
                style={selected === 4 ? style : noStyle}
                onClick={() => optionClicked(props.pollData._id, 4)}
              >
                {props.pollData.option4}
              </div>
            </div>
          </div>
          {/* <hr style={{ height: "2px" }} /> */}
          <div hidden={pollState !== 1} className="col-6 graph-div">
            <PieChart width={400} height={400}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
            <div className="container-fluid">
              <div className="row">
                <input
                  className="col-2"
                  id="option1color"
                  type={"color"}
                  value={COLORS[0]}
                  disabled={true}
                />
                <label
                  style={{ color: "black" }}
                  className="col-6"
                  htmlFor="option1color"
                >
                  Option A
                </label>
              </div>

              <div className="row">
                <input
                  className="col-2"
                  id="option2color"
                  type={"color"}
                  value={COLORS[1]}
                  disabled={true}
                />
                <label
                  style={{ color: "black" }}
                  className="col-6"
                  htmlFor="option2color"
                >
                  Option B
                </label>
              </div>

              <div className="row">
                <input
                  className="col-2"
                  id="option3color"
                  type={"color"}
                  value={COLORS[2]}
                  disabled={true}
                />
                <label
                  style={{ color: "black" }}
                  className="col-6"
                  htmlFor="option3color"
                >
                  Option C
                </label>
              </div>

              <div className="row">
                <input
                  className="col-2"
                  id="option4color"
                  type={"color"}
                  value={COLORS[3]}
                  disabled={true}
                />
                <label
                  style={{ color: "black" }}
                  className="col-6"
                  htmlFor="option4color"
                >
                  Option D
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Poll;
