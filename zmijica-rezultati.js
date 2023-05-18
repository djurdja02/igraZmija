$(document).ready(function(){
    let ime="";
    let rez=0;
    let niz=[];
    pokupiPrethodnog();
    pokupiNajbolje();
    ispisiNajbolje();
    

    function pokupiPrethodnog(){
        ime=localStorage.getItem("imePoslednjeg");
        rez=localStorage.getItem("rezultatPoslednjeg");
        if(ime!=null){
            $("#ime").text(ime);
            $("#rez").text(rez);
        }
    }

    function pokupiNajbolje(){
        if(localStorage.getItem("igraci5")!=null){
            niz=JSON.parse(localStorage.getItem("igraci5"));
        }
        else niz=[];
        for(let i=0;i<niz.length-1;i++){        
            for(let j=i+1;j<niz.length;j++){              
                if(niz[j].rezultat>niz[i].rezultat){
                    let tmp=niz[j];
                    niz[j]=niz[i];
                    niz[i]=tmp;
                }
            }
        }
        if(niz.length>5)niz=niz.slice(0,5);
        localStorage.setItem("igraci5",JSON.stringify(niz));
    }
    function ispisiNajbolje(){
        for(let k=0;k<niz.length;k++){
            let red=$("<tr></tr>");
            let celija=$("<td></td>");
            let st=(k+1)+"."+"Ime:  "+niz[k].ime+" , rezultat: "+niz[k].rezultat;
            celija.text(st);
            celija.attr("class","celija");
            red.append(celija);
            $("#tabela").append(red);
        }
        $(".celija").css({
            "font-weight":"bold",
            "text-align" :"center"
            
        });
    }
})