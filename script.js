const textinput = document.querySelector('#textinput');
const markdown_preview = document.querySelector('article');

textinput.addEventListener('input', (e) => {
    let content = e.target.value;

    const regex_h1 = /^#[^#].*$/gm;

    const regex_h2 = /^##[^#].*$/gm;

    const regex_bold = /\*\*[^\*\n]+\*\*/gm;

    const regex_italics = /[^\*]\*[^\*\n]+\*/gm;

    const regex_highlight = /==[^==\n]+==/gm;

    const regex_link = /\[[\w|\(|\)|\s|\*|\?|\-|\.|\,]*(\]\(){1}[^\)]*\)/gm;

    // const regex_list = /^(\s*(\-|\d\.) [^\n]+)+$/gm;

    const regex_ul = /^\-\s.*$/gm;
    const regex_ol = /^\d\.\s.*$/gm;

    if(regex_h1.test(content)){
        const matches = content.match(regex_h1); // returns array of all matches

        matches.forEach((ele) => {
            const extractedText = ele.slice(1); // each elelement has a # we remove that
            content = content.replace(ele, `<h1>${extractedText}</h1>`)

        })
    }

    if(regex_h2.test(content)){
        const matches = content.match(regex_h2); // returns array of all matches

        matches.forEach((ele) => {
            const extractedText = ele.slice(2); // each elelement has a ## we remove that
            content = content.replace(ele, `<h2>${extractedText}</h2>`)

        })
    }

    if(regex_bold.test(content)){
        const matches = content.match(regex_bold); // returns array of all matches

        matches.forEach((ele) => {
            const extractedText = ele.slice(2, ele.length-2); // each elelement has a ** ** we remove that
            content = content.replace(ele, `<strong>${extractedText}</strong>`)

        })
    }

    if(regex_italics.test(content)){
        const matches = content.match(regex_italics); // returns array of all matches

        matches.forEach((ele) => {
            const extractedText = ele.slice(2, ele.length-2); // each elelement has a * we remove that
            content = content.replace(ele, `<i>${extractedText}</i>`)

        })
    }


    if(regex_highlight.test(content)){
        const matches = content.match(regex_highlight); // returns array of all matches

        matches.forEach((ele) => {
            const extractedText = ele.slice(2, ele.length-2); // each elelement has a == text == we remove that
            content = content.replace(ele, `<mark>${extractedText}</mark>`)

        })
    }

    //[text](link)
    if(regex_link.test(content)){
        const matches = content.match(regex_link); // returns array of all matches

        matches.forEach(ele => {
            const text_and_link = ele.split("](");

            const text = text_and_link[0].slice(1);
            const link = text_and_link[1].slice(0,text_and_link[1].length-1);

            content = content.replace(ele, `<a href= 'https://${link}'>${text}</a>`)
            
        })
        
    }


    // - hi
    // - bye 
    if(regex_ul.test(content)){
        const matches = content.match(regex_ul);

       matches.forEach((ele, idx) => {
            if(matches.length ===1){
                content = content.replace(ele, `<ul><li>${ele.slice(2)}</li></ul>`);
            }else if(matches.length >1 && idx === 0){
                content = content.replace(ele, `<ul><li>${ele.slice(2)}</li>`);
            }else if(idx === matches.length-1){
                content = content.replace(ele, `<li>${ele.slice(2)}</li></ul>`);
            }else{
                content = content.replace(ele, `<li>${ele.slice(2)}</li>`);
            }
        })

    }

     // 1. hdhd
    // 2. jdjdj
    if(regex_ol.test(content)){
        const matches = content.match(regex_ol);

        matches.forEach((ele, idx) => {
            if(matches.length ===1){
                content = content.replace(ele, `<ol><li>${ele.slice(2)}</li></ol>`);
            }else if(matches.length >1 && idx === 0){
                content = content.replace(ele, `<ol><li>${ele.slice(2)}</li>`);
            }else if(idx === matches.length-1){
                content = content.replace(ele, `<li>${ele.slice(2)}</li></ol>`);
            }else{
                content = content.replace(ele, `<li>${ele.slice(2)}</li>`);
            }
        })

        
    }
    markdown_preview.innerHTML =content;

    
})

//  toggling button 
const themeBtn = document.querySelector('.theme');

themeBtn.addEventListener('click', () => {
    
    document.body.classList.toggle('dark');
    
    themeBtn.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';

    if(themeBtn.textContent === '🌙' ){
        themeBtn.classList.add('darkBtn')
    }
    if(themeBtn.textContent === '☀️' ){
        themeBtn.classList.remove('darkBtn')
    }

})