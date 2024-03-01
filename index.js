
const fs = require('fs');
const http = require('http');
const url = require('url');


///////////////////////////////////////////////////////////////////////

 //Blocking 

// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');

// const textOut = `diocaaaa ${textIn}\n Created on ${new Date().toISOString()}`;

// fs.writeFileSync('./txt/output.txt', textOut);

////////////////////////////////////////////////////////////////////////////////


//Non-Bloching

// fs.readFile('./txt/start.txt','utf-8',  (err, data1)=>{
//     fs.readFile(`./txt/${data1}.txt`,'utf-8',  (err, data2)=>{
//         console.log(data2);
//         fs.readFile('./txt/append.txt', 'utf-8', (err, data3)=>{
//             console.log(data3);

//             fs.writeFile('./txt/final.txt', `${data2}\n${data3}`,  'utf-8', err=>{
//                 console.log('deiuabn');
//             })
//         });
//     });
// });

//////////////////////////////////////////////////////////////////////////////////////

// Server
const replaceTemplate = (temp, product) =>{
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantyti);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);
    if(!product.organic===false){
        output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    
    }
    return output;
}

const templateOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const templateCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const templateProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj =  JSON.parse(data);

const server = http.createServer((req, res)=>{

    console.log(req.url);

    const pathName = req.url;

    // Overview
    if(pathName === '/' || pathName === '/overview'){

        res.writeHead(200, {'Content-type': 'text/html'});


        const cardsHtml = dataObj.map(el => replaceTemplate(templateCard, el)).join();
        const output = templateOverview.replace('%PRODUCT-CARD%', cardsHtml);
        

        res.end(output);

    // Product
    }else if(pathName === '/product?{id}'){
        output = templateOverview.replace('%PRODUCT-CARD%', cardsHtml);
        res.end(output);

    // Api
    }else if(pathName === '/api'){

        fs.readFile(`${__dirname}/dev-data/data.json`, 'utf-8', (err, data)=>{
            const productData =  JSON.parse(data);
            console.log(productData);
            res.writeHead(200, {'Content-type': 'application/json'});
            res.end(data);
        });
    }
    // 
    else{
        res.writeHead(404, {
            'Content-type' : 'text/html'
        })
        res.end('<h1>page not found</h1>');
    }
});

server.listen(3000, ()=>{
    console.log('listening');
});