function status() {
        var msg = ' ';
		Swal.fire({
		title: 'Conectado! Clique em um botão',
		showDenyButton: true,
		showCancelButton: false,
		confirmButtonText: 'Play',
		denyButtonText: 'Scores',
		}).then((result) => {
		  /* Read more about isConfirmed, isDenied below */
		if (result.isConfirmed) {
			window.location.href = "game.html";	   
					
		} 
		else if (result.isDenied) {
		     
			(async()=>{
			  
			 var result = await getRanking();
			  			 			  
			 var scores = [];
			 var hashs = [];
			 			 
			 for (var i = 0; i < result.length; i++){				
				 scores[i] = result[i].score;
				 hashs[i] =  result[i].player;
								 
			 }			  
			  
			  let x;
			  let j;
			  let aux1;
			  let aux2;
			  
			  //ordenação da lista de score
			  for (x = 1; x < scores.length; x++){			 
				 for (j = 0; j < x; j++){					
					if (scores[x] > scores[j]){
						aux1 = scores[x];
						aux2 = hashs[x];
						scores[x] = scores[j];
						hashs[x] = hashs[j];
						scores[j] = aux1;
						hashs[j] = aux2;
					}		  
				 }							  
			  }			 			  
			  
			  for (var i = 0; i < scores.length; i++) {
					if (i < 10){
					    let m = i;
						m++;
						msg = msg +'<b>'+m+'</b> - <b>Hash: '+hashs[i]+' '+'</b><code>Score: '+scores[i]+'</code><br>';
						Swal.fire(msg, '', 'success');
						Swal.fire({
						  title: '<strong>Scores Top 10</strong>',
						  icon: 'info',
						  html:
							'<font size="0.5px">' +
							msg +
							'</font>',
						  showCloseButton: true,
						  showCancelButton: false,
						  focusConfirm: false,
						  confirmButtonText:
							'<i class="fa fa-thumbs-up"></i> Fechar!'
						 
						})
					}						
			  }
			  
			})();
			 
		}
	  })          
            
    }

    function connect() {
            console.log('Calling connect()')
            ethereum
            .request({ method: 'eth_requestAccounts' })
            .then(status)
            .catch((err) => {
            if (err.code === 4001) {
                // EIP-1193 userRejectedRequest error
                // If this happens, the user rejected the connection request.
                console.log('Please connect to MetaMask.');
               
            }else {
                console.log(error);
            }
            });
    }
		$( document ).ready(function() {
		 $('#enableMetamask').click(function() {
                connect();				
            });
		})


		function mostrarNotificacao(cabecalho,conteudo){
                var content = '<div class="janela-base">'+
                  '<div class="janela-titulo">'+
                  '<span id="titulo">'+cabecalho+'</span>'+
                  '</div>'+
                  '<div class="janela-corpo">'+
                      '<div id="corpo">'+conteudo+'</div>'+
                      '<button id="btn-fechar" onclick="fechar()">fechar</button>'+
                  '</div>'+
                  '</div>';
                
                $('.conteudo').append(content);
                $('.janela-base').addClass('visivel').removeClass('fechar');
                setTimeout(function(){
                  $('.janela-base').first().remove();
                },10000);
            }
            function fechar(){
                var x=document.getElementById("janela-base");
                x.classList.remove("visivel");
                x.classList.add("fechar");
            }

            

