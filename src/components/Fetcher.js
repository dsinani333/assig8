import React, { useState, useEffect, useCallback } from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
//import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/core/Skeleton';

const publicURL = 'https://swe432tomcat.herokuapp.com';
const getLocationUrlData = () => {
  return {
      url:publicURL,
      hash: `${window.location.hash}`
  };
};

const servicePath ='/echo';

function Fetcher(props) {
    const { url, value} = props;
    const [response, setResponse] = useState(null);
    const [inputValue, setInputValue] = useState("");
    //const [inputValue1, setInputValue1] = useState("");
    const [final, setfinal] = useState("");
    const [fweek, setfweek] = useState("");
    const [fyear, setfyear] = useState("");
    const [fwy, setfwy] = useState("");
    const body = `Date with new format=${final},  Day of the year: ${fyear},  Day of the week: ${fweek},  Week of the year: ${fwy}, `;

    const  fetchData= useCallback(async()=>{
      const res = await fetch(url,
        {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          //credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            // 'Content-Type': 'application/json'
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          //redirect: 'follow', // manual, *follow, error
          //referrerPolicy: 'no-referrer', // no-referrer, *client
          body  // body data type must match "Content-Type" header
        }
      );
      const json = await res.json();
      setResponse(json);
    },
     [url, body]
   );

    useEffect( ()=> {
      setResponse(null);
      fetchData().catch(e=>{console.log(e)});
    }, [fetchData]);

    const doCalculations = function (event) {
      console.log(event.currentTarget.getAttribute('data-something'));
      
      var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
      var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
      var tempInput = inputValue;
      var values = [];
      var dateValues = [];
      values = tempInput.split(" ");
      dateValues = values[0].split("/");

      var resultDate;
      
      //converting date to proper format
      if (values[1] == "1"){
        resultDate = months[parseInt(dateValues[0])-1]+ " " + String(parseInt(dateValues[1])) +" "+ dateValues[2];

      } else if(values[1] == "2"){
        resultDate = String(parseInt(dateValues[1])) + " " + months[parseInt(dateValues[0])-1] +" "+ dateValues[2];

      } else if(values[1] == "3"){
        resultDate = String(parseInt(dateValues[1])) + "/" + dateValues[0] +"/"+ dateValues[2];

      } else if(values[1] == "4"){
        resultDate = dateValues[1] + "-" + months[parseInt(dateValues[0])-1] +"-"+ dateValues[2];

      } else {
        resultDate = String(parseInt(dateValues[1])) + "-" + months[parseInt(dateValues[0])-1];
      }

      //day of the week
      var d,m,c,y,weekday;

      d = parseInt(dateValues[1]);
      
      c = parseInt(dateValues[2].slice(0,2));

      y = parseInt(dateValues[2].slice(2));

      if(parseInt(dateValues[0]) == 1){
        m = 11;
        y--;
      } else if(parseInt(dateValues[0]) == 2){
        m = 12;
        y--;
      } else {
        m = parseInt(dateValues[0]) - 2;
      }

      weekday = Math.abs((d + Math.abs(Math.trunc((2.6*m)-0.2)) - (2*c) + y + Math.abs(Math.trunc(y/4)) + Math.abs(Math.trunc(c/4)))%7);
      // weekday = d;
      // weekday = weekday + Math.abs(Math.trunc(((13*m)-1)/5));
      // weekday = weekday + y;
      // weekday = weekday + Math.trunc(y/4);
      // weekday = weekday + Math.trunc(c/4);
      // weekday = weekday - Math.trunc(2*c);
      // weekday = Math.abs(Math.trunc(weekday % 7));
      
      //week of the year
      var temp1 = 0;
      for (var i=1; i< parseInt(dateValues[0]); i++){
        temp1 = temp1+ 4.3;
      }
      var temp2 = 30 -parseInt(dateValues[1]);
      temp1 = temp1 + (temp2/7);
      
      //day of the year
      var t1 = 0;
      for (var i=1; i< parseInt(dateValues[0]); i++){
        t1 = t1+ 30;
      }
      var t2 = 30 -parseInt(dateValues[1]);
      t1 = t1 + (t2);
      
      setfinal(resultDate);
      setfyear(t1);
      setfweek(days[Math.floor(weekday)]);
      setfwy(Math.trunc(temp1));
    }

    //day of year

    const handleChange = (event) => {
      setInputValue(event.target.value);
    };

    return (
        <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={3}
        >
          <Grid item xs>
          <h1><center>SWE432 Final Exam</center></h1>
          <h2><center>Daniel Sinani</center></h2>
          <p><strong>Instructions:</strong> Enter a date and one of the option numbers below with this format: <strong>mm/dd/yyyy x</strong></p>
          <p><center><font size="3"><strong>1</strong> for "monthname day year"</font></center></p>
          <p><center><font size="3"><strong>2</strong> for "day monthname year"</font></center></p>
          <p><center><font size="3"><strong>3</strong> for "dd/mm/yy"</font></center></p>
          <p><center><font size="3"><strong>4</strong> for "day-monthname-year"</font></center></p>
          <p><center><font size="3"><strong>5</strong> for "day-monthname"</font></center></p>
          <p><center><font size="4">Example input: <strong>01/01/2022 3</strong></font></center></p>
          </Grid>
            <Grid item xs>
              <TextField
              label="mm/dd/yyyy x"
              helperText="Format"
              value={inputValue} onChange={handleChange} />
            </Grid>
            <Grid item xs>
              <Button onClick={doCalculations} variant="contained" color="primary" data-something="submit">
                  SUBMIT</Button>
            </Grid>
            <Grid item xs>
              <Paper elevation={3} style={
                {height:100, width:850, wordBreak: "break-all", padding:4}
              } >
                {response?JSON.stringify(response):
                (<React.Fragment>
                <Skeleton variant="text" />
                <Skeleton variant="circle" width={40} height={40} />
                <Skeleton variant="rect" width={200} height={118} />
                </React.Fragment>)}
                </Paper>
              </Grid>
        </Grid>
    );
}

export default function FetcherControlled(props) {
  const url = `${getLocationUrlData().url}${servicePath}`;
  
  return  <Fetcher value={"someValue"} url={url}/>;
}
