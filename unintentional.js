var initGraph1=function(deaths)
    {
        var screen={width:400,height:400}
        var margins={left:70,right:20,top:20,bottom:70}
        
      var graph = 
        {
            width:screen.width-margins.left-margins.right,
            height:screen.height - margins.top-margins.bottom
        }
      
        d3.select("#graph1")
            .attr("width",screen.width)
            .attr("height",screen.height)
        
        var target=d3.select("#graph1")
            .append("g")
            .attr("id","canvas1")
            .attr("transform",
          "translate("+margins.left+","+
                        margins.top+")");
        var xScale=d3.scaleLinear()
            .domain([2000,2018])
            .range([0,graph.width])
        
        var yScale=d3.scaleLinear()
            .domain([0,50000])
               .range([graph.width,0])
        
        drawLines1(deaths,target,xScale,yScale);
        drawAxes1(graph,margins,xScale,yScale);
        drawLabels1(graph,margins)
    }
var drawLines1=function(deaths,target,xScale,yScale)
     {   
         var lineGenerator=d3.line()
            .x(function(yearRec, i)
                {
                    return xScale(yearRec.Year);
                })
            .y(function(yearRec)
                {
                    return yScale(yearRec.Value)
                })
         d3.select("#canvas1")
            .append("path")
            .datum(deaths)
            .attr("d",lineGenerator)
          target
            .selectAll("circle")
            .data(deaths)
            .enter()
            .append("circle")
            .attr("cx",function(deaths)
                {
                    return xScale(deaths.Year);   
                })
            .attr("cy",function(deaths)
                {
                    return yScale(deaths.Value);    
                })
            .attr("r",6)
         .on("mouseenter" ,function(death)
            {
                console.log("hovering",death.Value);
                
                var xPos = d3.event.pageX;
                var yPos = d3.event.pageY;
            
                    d3.select("#tooltip")
                        .classed("hidden",false)
                        .style("top",yPos+"px")
                        .style("left",xPos+"px")
                    
                    d3.select("#Year")
                        .text(death.Year);
        
                    d3.select("#Value")
                        .text(death.Value);
            })
         .on("mouseleave",function()
            {
               d3.select("#tooltip")    
                .classed("hidden",true);  
            })         
    
         
        
    }
var drawAxes1=function(graph,margins,xScale,yScale)
    {
        var xAxis=d3.axisBottom(xScale);
            d3.select("#graph1")
                .append("g")
                .attr("transform","translate("+margins.left+","+(margins.top+graph.height)+")")
                .call(xAxis)
        var yAxis=d3.axisLeft(yScale);
            d3.select("#graph1")
                .append("g")
                .attr("transform","translate("+margins.left+","+margins.top+")")
                .call(yAxis);
    }
var drawLabels1=function(graph,margins)
    {
        var xAxis=d3.axisTop(margins);
        
        var labels=d3.select("#graph1")
            .append("g")
            .classed("labels",true)
        labels.append("text")
            .text("Total Number of Unintentional Deaths")
            .classed("title",true)
            .attr("text-anchor","middle")
            .attr("x",graph.width/2)
            .attr("y",margins.top)
            .attr("transform","translate("+margins.left+","+margins.top+")")
        labels.append("g")
            .attr("transform","translate(10,"+(margins.top+(graph.height/2))+")")
            .append("text")
            .text("Number of Unintentional Deaths")
            .classed("label",true)
            .attr("text-anchor","middle")
            .attr("transform","rotate(90)")
         labels.append("g")
            .append("text")
            .text("Year")
            .classed("label",true)
            .attr("text-anchor","middle")
            .attr("x",margins.left+graph.width/2)
            .attr("y",graph.height+margins.bottom)
        
    }     
        
       



//Promise
var successFCN1=function(deaths)
    {
        console.log("Total Unintentional",deaths);
        initGraph1(deaths);
        
    }
var failFCN1=function(error)
    {
        console.log("Error",error);
    }
var dataPromise1=d3.json("unintentional.json")
dataPromise1.then(successFCN1,failFCN1);