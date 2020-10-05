var initGraph=function(deaths)
    {
        var screen={width:500,height:500}
        var margins={left:80,right:70,top:75,bottom:75}
        
      var graph = 
        {
            width:screen.width-margins.left-margins.right,
            height:screen.height - margins.top-margins.bottom
        }
       d3.select("#graph6")
            .attr("width",screen.width)
            .attr("height",screen.height)
        
        var target=d3.select("#graph6")
            .append("g")
            .attr("id","canvas6")
            .attr("transform",
          "translate("+margins.left+","+
                        margins.top+")");
       
        var xScale=d3.scaleLinear()
            .domain([2000, 2018])
            .range([0,graph.width])
        
        var yScaleD=d3.scaleLinear()
            .domain([0,50000])
               .range([graph.width,0])
        var yScaleGDP=d3.scaleLinear()
            .domain([-5,5])
               .range([graph.width,0])
        
        drawLines6(deaths,target,xScale,yScaleD,yScaleGDP);
        drawAxes6(graph,margins,xScale,yScaleD,yScaleGDP);
        drawLabels6(graph,margins) 
      }

var drawLines6=function(deaths,target,xScale,yScaleD,yScaleGDP)
     {   
         var lineGeneratorD=d3.line()
            .x(function(yearRec, i)
                {
                    return xScale(yearRec.Year);
                })
            .y(function(yearRec)
                {
                    return yScaleD(yearRec.Value)
                })
        var lineGeneratorGDP=d3.line()
            .x(function(yearRec, i)
                {
                    return xScale(yearRec.Year);
                })
            .y(function(yearRec)
                {
                    return yScaleGDP(yearRec.GDP)
                })
        d3.select("#canvas6")
            .append("path")
            .datum(deaths)
            .attr("d",lineGeneratorD)
         d3.select("#canvas6")
            .append("path")
            .datum(deaths)
            .attr("d",lineGeneratorGDP)
            .classed("line",true)
            .attr("fill","none")
            .style("stroke","red")
            .style("stroke-width","4px")
        target.append("g")
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
                    return yScaleD(deaths.Value);    
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
         target.append("g")
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
                    return yScaleGDP(deaths.GDP);    
                })
            .attr("r",6)
            .attr("fill", "red")
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
                        .text(death.GDP);
            })
         .on("mouseleave",function()
            {
               d3.select("#tooltip")    
                .classed("hidden",true);  
            })  
        }

var drawAxes6=function(graph,margins,xScale,yScaleD,yScaleGDP)
    {
        var xAxis=d3.axisBottom(xScale);
            d3.select("#graph6")
                .append("g")
                .attr("transform","translate("+margins.left+","+(margins.top+graph.height)+")")
                .call(xAxis)
        var yAxis=d3.axisLeft(yScaleD);
            d3.select("#graph6")
                .append("g")
                .attr("transform","translate("+margins.left+","+margins.top+")")
                .call(yAxis);
        var yAxis=d3.axisRight(yScaleGDP);
			d3.select("#graph6")
                .append("g")
                .attr("transform","translate("+(margins.left+graph.width)+","+margins.top+")")
                .call(yAxis)
    }

var drawLabels6=function(graph,margins)
    {
        var xAxis=d3.axisTop(margins);
        
        var labels=d3.select("#graph6")
            .append("g")
            .classed("labels",true)
        labels.append("text")
            .text("Total Number of Deaths per and GDP per Year")
            .classed("title",true)
            .attr("text-anchor","middle")
            .attr("x",graph.width/2)
            .attr("y",margins.top)
            .attr("transform","translate("+margins.left+",-40)")
        labels.append("g")
            .attr("transform","translate(10,"+(margins.top+(graph.height/2))+")")
            .append("text")
            .text("Number of Deaths")
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
            .attr("transform","translate(0,50)")
        labels.append("g")
            .attr("transform","translate(465,"+(margins.top+(graph.height/2))+")")
            .append("text")
            .text("GDP Rate")
            .classed("label",true)
            .attr("text-anchor","middle")
            .attr("transform","rotate(90)")    
    }
var successFCN=function(deaths)
    {
        console.log("Action Data",deaths);
        initGraph(deaths);
    }
var failFCN=function(error)
    {
        console.log("Error",error);
    }
var dataPromise=d3.json("line32.json")
dataPromise.then(successFCN,failFCN);