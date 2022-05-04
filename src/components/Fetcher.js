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
    //const [clicks, setClicks] = useState(0);
    const [response, setResponse] = useState(null);
    const [inputValue, setInputValue] = useState("");
    const [final, setfinal] = useState("");
    const body = `Characteristics and their blocks=${final}`;

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

    const doSomething = function (event) {
      console.log(event.currentTarget.getAttribute('data-something'));
        
      //setnumCharacteristics(inputValue);
      var tempInput = inputValue;
      var values = [];
      values = tempInput.split(" ");
      
      var numCharacteristics = 1;
      numCharacteristics = parseInt(values[0]);
      
      var charName = 'A';
      var numBlocks = [];
      var Characs = [];
      var C;
      //var temp = "";

      numBlocks = values.slice(1);

      //Characs[0] = new characteristic("D", 1);
      
      var i;
      for (i=0; i<numCharacteristics; i++) {
        C = new characteristic(charName, parseInt(numBlocks[i]));
        Characs[i] = C;
        //break;
        charName = String.fromCharCode(charName.charCodeAt(0) + 1);;
      }

      var result = [];
      for (var j=0; j<numCharacteristics; j++) {
        //result = Characs[j].getName() + ": ";
        //result = "Characteristic " + Characs[j].getName() + ": ";
        result[j] = Characs[j].getBlocks();
      }

      //setfinal(Characs[0].toString());
      //setfinal(charName);
      setfinal(result);
    }

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
          <h1><center>SWE 432 Assigment 8</center></h1>
          <h2><center>Daniel Sinani, Eric Schumacher, Arian Filipour</center></h2>
          <p><center>Instructions:</center> </p>
          <p>Chose the number of characteristics N, then provide the number of blocks in each characteristic.</p>
          <p>Please enter small integers for the numbers in the format: "N x0 x1 x2 ... xN".</p>
          <p>Example list of numbers if intial number is 4: "4 1 2 5 2".</p>
          </Grid>
            <Grid item xs>
              <TextField
              label="Enter number list"
              //helperText="This will be echo echo by the server "
              value={inputValue} onChange={handleChange} />
            </Grid>
            <Grid item xs>
              <Button onClick={doSomething} variant="contained" color="primary" data-something="submit">
                  submit</Button>
            </Grid>
            <Grid item xs>
              <Paper elevation={3} style={
                {height:200, width:500, wordBreak: "break-all", padding:4}
              } >
                {response?JSON.stringify(response):
                (<React.Fragment>
                <Skeleton variant="text" />
                <Skeleton variant="circle" width={40} height={40} />
                <Skeleton variant="rect" width={200} height={118} />
                </React.Fragment>)}
                </Paper>
              </Grid>
              <p><strong>Collaborative Summary:</strong> Daniel worked on the doSomething() function and deploying on Heroku. 
              Arian and Eric worked on the web page writings and styling. We all worked on the output logic.</p>
        </Grid>
    );
}

class characteristic{
  #name = "A";
  #numBlocks = 2;

  constructor(n,b)
  {
    this.#name = n;
    this.#numBlocks = b;
  }

  getName(){
    return this.#name;
  }

  setName (n)
  {
    this.#name = n;
  }

  getNumBlocks ()
  {
    return this.#numBlocks;
  }

  setNumBlocks (b)
  {
    this.#numBlocks = b;
  }

  toString()
  {
    return ("[" + this.#name + ", " + this.#numBlocks + "]");
  }

  getBlocks()
  {
    var returnVal = "[ ";
    for (var j=0; j<this.#numBlocks; j++)
    {
      returnVal += this.#name + (j+1);
      if (j<this.#numBlocks-1)
        returnVal += ",";
      returnVal += " ";
    }
    returnVal += "]";
    return returnVal;
  }
}

export default function FetcherControlled(props) {
  const url = `${getLocationUrlData().url}${servicePath}`;
  
  return  <Fetcher value={"someValue"} url={url}/>;
}
