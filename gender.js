var initGraph5=function(deaths)
    {
        var screen={width:400,height:400}
        var margins={left:70,right:20,top:20,bottom:70}
        
      var graph = 
        {
            width:screen.width-margins.left-margins.right,
            height:screen.height - margins.top-margins.bottom
        }
      d3.select("#graph5")
            .attr("width",screen.width)
            .attr("height",screen.height)
        
        var target=d3.select("#graph5")
            .append("g")
            .attr("id","canvas5")
            .attr("transform",
          "translate("+margins.left+","+
                        margins.top+")");
        var xScale=d3.scaleBand()
            .domain(["Total","Male","Female"])
            .range([0,graph.width])
            .paddingInner(0.05)
        var yScale=d3.scaleLinear()
            .domain([0,200000])
               .range([graph.width,0])
    
    drawBars5(deaths,target,graph, xScale,yScale); 
    drawAxes5(graph,margins,xScale,yScale);
    drawLabels5(graph,margins)
    }
var drawBars5 = function(death,target,graphDim,
                         xScale,yScale)
    {
        target
            .selectAll("rect")
            .data(death)
            .enter()
            .append("rect")
            .attr("x",function(pref)
                {
                    return xScale(pref.Category);
                })
            .attr("y",function(pref)
                {
                    return yScale(pref.Value);
                })
            .attr("width",xScale.bandwidth)
            .attr("height",function(pref)
                {   
                    return graphDim.height-yScale(pref.Value);  
                }) 
            .attr("fill", "darkred")
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
                        .text(death.Category);
            
                    d3.select("#Value")
                        .text(death.Value);
            })
         .on("mouseleave",function()
            {
               d3.select("#tooltip")    
                .classed("hidden",true);  
            })   
    }

var drawAxes5=function(graph,margins,xScale,yScale)
    {
        var xAxis=d3.axisBottom(xScale);
            d3.select("#graph5")
                .append("g")
                .attr("transform","translate("+margins.left+","+(margins.top+graph.height)+")")
                .call(xAxis)
        var yAxis=d3.axisLeft(yScale);
            d3.select("#graph5")
                .append("g")
                .attr("transform","translate("+margins.left+","+margins.top+")")
                .call(yAxis);
    }

var drawLabels5=function(graph,margins)
    {
        var xAxis=d3.axisTop(margins);
        
        var labels=d3.select("#graph5")
            .append("g")
            .classed("labels",true)
        labels.append("text")
            .text("Overdose Deaths: 2000-2018")
            .classed("title",true)
            .attr("text-anchor","middle")
            .attr("x",graph.width/2)
            .attr("y",margins.top)
            .attr("transform","translate(130,"+margins.top+")")
        labels.append("g")
            .attr("transform","translate(10,"+(margins.top+(graph.height/2))+")")
            .append("text")
            .text("Number of Deaths")
            .classed("label",true)
            .attr("text-anchor","middle")
            .attr("transform","rotate(90)")
         labels.append("g")
            .append("text")
            .text("Category")
            .classed("label",true)
            .attr("text-anchor","middle")
            .attr("x",margins.left+graph.width/2)
            .attr("y",graph.height+margins.bottom)
    }

var successFCN5=function(deaths)
    {
        console.log("Total Data",deaths);
        initGraph5(deaths);
        
    }
var failFCN5=function(error)
    {
        console.log("Error",error);
    }
var dataPromise5=d3.json("gender.json")
dataPromise5.then(successFCN5,failFCN5);