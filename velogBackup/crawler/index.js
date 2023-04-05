const axios = require('axios');
const fs = require('fs');
const { join } = require('path');

const { PostsQuery, PostQuery } = require('./query');

class Crawler {
  constructor(username, { delay, cert }) {
    this.username = username; 

    if (!username) {
      console.error('❌ 유저이름을 입력해주세요')
      process.exit(1);
    }

    // options
    this.delay = delay;
    this.cert = cert;

    this.__grahpqlURL = 'https://v2.velog.io/graphql';
    this.__api = axios.create({
      headers:{
        Cookie: cert ? `access_token=${cert};` : null,
      }, 
    });
  }

  async parse() {
     // 특수문자 [, ( 는 docusaurus에서 열람시 오류 발생.
    const folderPath = join('..', 'docs', 'uncategorized');
    const imgFolderPath = join('..', 'static', 'velogimages');

    
    const posts = await this.getPosts();
    // Clear All
    await this.deleteAllFilesInFolder(imgFolderPath);
    await this.deleteAllFilesInFolder(folderPath);
     
    posts.map(async(postInfo, i) => { 
      if (this.delay > 0) await new Promise(r => setTimeout(r, this.delay * i));

      let post = await this.getPost(postInfo.url_slug);
      if (!post) {
        console.log(`⚠️  " ${postInfo.url_slug} " 가져올 수 없는 글을 건너뛰었습니다.`);
        return;
      }


      
      // Insert Data
      post.body = await this.getImage(post.body);
      await this.writePost(post, folderPath);

      console.log(`✅ " ${post.title} " 백업 완료`);
    });
  }

 async deleteAllFilesInFolder(folderPath) {
  try {
    const files = await fs.promises.readdir(folderPath, { withFileTypes: true });

    for (const file of files) {
      const filePath = join(folderPath, file.name);

      if (file.isDirectory()) {
        // If it's a directory, delete all files and folders inside it recursively
        await deleteAllFilesInFolder(filePath);
        await fs.promises.rmdir(filePath);
      } else {
        // If it's a file, delete it
        await fs.promises.unlink(filePath);
      }
    }
  } catch (e) {
    if (e.code === 'ENOENT') {
      console.warn(`⚠️ The folder "${folderPath}" does not exist.`);
    } else {
      throw e;
    }
  }
}



  async getPosts() {
    const url = `https://velog.io/@${this.username}`;
    let response;
    let posts = [];

    try {
      await this.__api.get(url);
    } catch (e) {
      if (e.response.status === 404) {
        console.error(`⚠️  해당 유저를 찾을 수 없어요 \n username = ${this.username}`);
        process.exit(1);
      }

      console.error(e);
    }

    while (true) {
      try {
        if (response && response.data.data.posts.length >= 20) {
          response = await this.__api.post(this.__grahpqlURL, PostsQuery(this.username, posts[posts.length - 1].id));
        } else {
          response = await this.__api.post(this.__grahpqlURL, PostsQuery(this.username));
        }
      } catch(e) {
        console.error(`⚠️  벨로그에서 글 목록을 가져오는데 실패했습니다. \n error = ${e}`);
        process.exit(1);
      }
      
      posts = [...posts, ...response.data.data.posts];
      if (response.data.data.posts.length < 20) break;
    }

    console.log(`✅ ${this.username}님의 모든 글(${posts.length} 개) 을 가져옴`);

    return posts;
  }

  async getPost(url_slug) {
    let response;

    try {
      response = await this.__api.post(this.__grahpqlURL, PostQuery(this.username, url_slug));
    } catch (e) {
      console.error(`⚠️  벨로그에서 글을 가져오는데 실패했습니다. \n error = ${e} url = ${url_slug}`);
      process.exit(1);
    }
    
    return response.data.data.post;
  }

  async writePost(post) {
    //const excludedChar = ['\\\\', '/', ':' ,'\\*' ,'\\?' ,'"' ,'<' ,'>' ,'\\|'];
    //let title = post.title;

    let title = this.removeSpecialChars(post.title).trim();
    let shortDescription = this.removeSpecialChars(post.short_description);
    const path = join('..', 'docs', 'uncategorized', `${title.replace(/\[/g, '').replace(/\]/g, ' -')}.md`);

    post.body = '---\n'
                + `title: "${title}"\n`
                + `description: "${shortDescription.replace(/\n/g, ' ')}"\n`
                + `date: ${post.released_at}\n`
                + `tags: ${JSON.stringify(post.tags)}\n`
                + '---\n' + post.body;
    
    try {
      await fs.promises.writeFile(path, post.body, 'utf8');
    } catch (e) {
      console.error(`⚠️ 파일을 쓰는데 문제가 발생했습니다. / error = ${e}  title = ${post.title}`);
    }
  }

  removeSpecialChars(str) {
    const excludedChar = ['\\\\', '/', ':', '\\*', '\\?', '"', '<', '>','\\(','\\)','\\|'];

    for (const char of excludedChar) {
      const re = new RegExp(char, 'g');
      str = str.replace(re, '');
    }

    return str;
  }

  async getImage(body) {
    const regex = /!\[[^\]]*\]\((.*?.png|.jpeg|.jpg|.webp|.svg|.gif|.tiff)\s*("(?:.*[^"])")?\s*\)|!\[[^\]]*\]\((.*?)\s*("(?:.*[^"])")?\s*\)/g;
    
    body = body.replace(regex, (_, url) => {
      if (!url) return;

      const filename = url.replace(/\/\s*$/,'').split('/').slice(-2).join('-').trim();
      const path = join('..', 'static', 'velogimages', decodeURI(filename));
      // const folderPath = join('..', 'docs', 'uncategorized');
      this.__api({
        method: 'get',
        url: encodeURI(decodeURI(url)),
        responseType: 'stream',
      })
      .then(resp => resp.data.pipe(fs.createWriteStream(path)))
      .catch(e => console.error(`⚠️ 이미지를 다운 받는데 오류가 발생했습니다 / url = ${url} , e = ${e}`));

      return `![](/velogimages/${filename})`;
    });

    return body;
  }

};

module.exports = Crawler;
