para fazer os modelos aparecerem no formato .gltf:
    quando voçe baixa os modelos eles funcionam normalmente,mas quando muda o nome para ficar com os arquivos mais organizados, o gltf e o binario correspondente não se comunicam mais direito. então, para resolver quando baixar o modelo que vai ter o nome padrão de "scene" , voçe vai entrar no arquivo. "nome-do-arquivo.gltf" , e vai ter 2 trechos escritos buffers e images , onde tiver escrito scene dentro deles, que fica na frente de uma parte chamada "uri", voçe troca o "scene" por  "nome-do-arquivo".


    ou voçe usa o comando "sed -i 's/scene\.bin/*nome-do-arquivo*.bin/' *nome-do-arquivo*.gltf". resolveu o meu problema dessa vez