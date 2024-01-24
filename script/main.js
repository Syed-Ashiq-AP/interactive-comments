let data = JSON.parse(localStorage.getItem('data')), cu=null,ci=null
let idc = 0, did = null, uid = null, reid = null;

if(data == undefined){
  
  data={
    "currentUser": {
      "image": {
        "png": "./images/avatars/image-juliusomo.png",
        "webp": "./images/avatars/image-juliusomo.webp"
      },
      "username": "juliusomo"
    },
    "comments": []}
    localStorage.setItem('data',JSON.stringify(data))
    
}
    cu = data.currentUser.username
    ci = data.currentUser.image


function load_user() {
  document.getElementById('main-user-avt').src =  ci.webp;
}

function load_comments() {
  idc = 0
  let coms = data.comments
  document.querySelector('#comments').innerHTML = `</section>
    `

  for (const [k, v] of Object.entries(coms)) {
    idc += 1;
    let self = ''
    if (v.user.username == cu) {
      self = 'self'
    }
    let t = new Date(v.createdAt)
    let createdAt = Math.round(Math.abs((t - new Date()) / (24 * 60 * 60 * 1000)));
    let html = `
        <section id='umc-`+ v.id + `' class="user-chat ` + self + `">
        
        <section class="user-cc">
          <section class="top-bar">
            <section class="lb">
              <img class="cavt" src="`+ v.user.image.webp + `">
              <span class="name">`+ v.user.username + `</span>
              <span class="since">`+ createdAt + ` Days</span>
            </section>
            
          </section>
          <section  contenteditable="false" id='umc-txt-`+ v.id + `' class="editable-text">
          <p>`+ v.content + `</p>
          </section>
          <button onclick='update_cmt()' class="updbt">Update</button>
        </section>



        <section class='busc'>
        <section class="vote">
          <svg onclick='upvote(`+ v.id + `)' class="vbt" width="11" height="11" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
              fill="#C5C6EF" />
          </svg>
          <p>`+ v.score + `</p>
          <svg onclick='downvote(`+ v.id + `)' class="vbt" width="11" height="3" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
              fill="#C5C6EF" />
          </svg>
        </section>
        <section class="actions">
            <div onclick='tgl_rep(`+ v.id + `)' class="action-bt repbt">
              <svg class="ubt" width="14" height="13" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z"
                  fill="#5357B6" />
              </svg>
              <p>Reply</p>
            </div>
            <div onclick="dlt_modal(`+ v.id + `)" class="action-bt delbt">
              <svg class="ubt" width="12" height="14" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z"
                  fill="#ED6368" />
              </svg>
              <p>Delete</p>
            </div>
            <div onclick='tgl_edit(`+ v.id + `)' class="action-bt editbt">
              <svg class="ubt" width="14" height="14" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z"
                  fill="#5357B6" />
              </svg>
              <p>Edit</p>
            </div>
          </section>
        </section>
      </section>
     
      <section id='uc-repc-`+ v.id + `' class="client-bar reply edit">
        <section class="auth">
        <img src=".`+ ci.webp + `">
        </section>
        <section contenteditable class="editable-text">
        <p></p>
        </section>
        <button onclick='send_rep(`+ v.id + `,"` + v.user.username + `")'>Reply</button>
      </section>
        `
    document.querySelector('#comments').insertAdjacentHTML('beforeend', html)
    if (v.replies.length > 0) {
      load_reply(v.replies, v.id)
    }
  }
}

function load_reply(replies, id) {
  let rht = `
    <section class="replies">

        <div class="dvd">

        </div>
        <section id='rep_c_`+ id + `' class="rep_cc">
        </section>
    </section>
    `

  document.querySelector('#comments').insertAdjacentHTML('beforeend', rht)
  for (const v of Object.values(replies)) {
    idc += 1
    let self = ''
    if (v.user.username == cu) {
      self = 'self'
    }
    let t = new Date(v.createdAt)
    let createdAt = Math.round(Math.abs((t - new Date()) / (24 * 60 * 60 * 1000)));
    let html = `
        <section id='umc-`+ v.id + `' class="user-chat ` + self + `">
        
        <section class="user-cc">
        <section class="top-bar">
            <section class="lb">
            <img class="cavt" src=".`+ v.user.image.webp + `">
            <span class="name">`+ v.user.username + `</span>
            <span class="since">`+ createdAt + ` Days</span>
            </section>
            
          
        </section>
        
        <section id='umc-txt-`+ v.id + `' class="editable-text">
        <p><span class='repto'>@`+ v.replyingTo + `&nbsp;</span> ` + v.content + `</p>
        </section>
        <button onclick='update_cmt()' class="updbt">Update</button>
        </section>
        
        <section class='busc'>

        <section class="vote">
        <svg onclick='upvote(`+ id + `,` + v.id + `)' class="vbt" width="11" height="11" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
              fill="#C5C6EF" />
          </svg>
          <p>`+ v.score + `</p>
          <svg onclick='downvote(`+ id + `,` + v.id + `)' class="vbt" width="11" height="3" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
              fill="#C5C6EF" />
          </svg>
        </section>

        <section class="actions">
            <div onclick='tgl_rep(`+ v.id + `)' class="action-bt repbt">
              <svg class="ubt" width="14" height="13" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z"
                  fill="#5357B6" />
              </svg>
              <p>Reply</p>
            </div>
            <div onclick="dlt_modal(` + id + `,` + v.id + `)" class="action-bt delbt">
              <svg class="ubt" width="12" height="14" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z"
                  fill="#ED6368" />
              </svg>
              <p>Delete</p>
            </div>
            <div onclick='tgl_edit(`+ v.id + `,` + id + `)' class="action-bt editbt">
              <svg class="ubt" width="14" height="14" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z"
                  fill="#5357B6" />
              </svg>
              <p>Edit</p>
            </div>
          </section>
        </section>
        
    </section>
    <section id='uc-repc-`+ v.id + `' class="client-bar reply edit">
        <section class="auth">
        <img src="`+ ci.webp + `">
        </section>
        <section contenteditable class="editable-text">
        <p></p>
        </section>
        <button onclick='send_rep(`+ id + `,"` + v.user.username + `",` + v.id + `)'>Reply</button>
    </section>
        `
    document.querySelector('#rep_c_' + id).insertAdjacentHTML('beforeend', html)
  }

}

function add_mc() {
  let txt = document.querySelector('#client-txt').value
  if (txt != '') {
    let tdata = {
      "id": idc + 1,
      "content": txt,
      "createdAt": new Date(),
      "score": 0,
      "user": {
        "image": {
          "png": ci.png,
          "webp": ci.webp
        },
        "username": cu
      },
      "replies": []
    }
    data.comments.push(tdata)
    localStorage.setItem('data', JSON.stringify(data))
    load_comments()
  }
}

function tgl_modal() {
  document.querySelector('.modal').classList.toggle('vism')
}

function dlt_modal(id, rep = null) {
  did = [id, rep]
  tgl_modal()
}

function delete_cmt() {
  let coms = data.comments
  for (const [k, v] of Object.entries(coms)) {
    if (v.id == did[0]) {
      if (did[1] == null) {
        let index = data.comments.indexOf(v)
        data.comments.splice(index, 1)
        break
      }
      else {
        for (const [k1, v1] of Object.entries(v.replies)) {
          if (v1.id == did[1]) {
            let index = v.replies.indexOf(v1)
            v.replies.splice(index, 1)
            break
          }
        }
        break
      }
    }
  }
  localStorage.setItem('data', JSON.stringify(data))
  load_comments()
  tgl_modal()
}

function tgl_edit(id, rid = null) {
  uid = [id, rid]
  document.getElementById('umc-' + id).classList.toggle('edit')
  if (document.getElementById('umc-txt-' + id).contentEditable == 'true') {
    document.getElementById('umc-txt-' + id).contentEditable = false

  } else {
    document.getElementById('umc-txt-' + id).contentEditable = true
    document.getElementById('umc-txt-' + id).children[0].children[0].remove()
  }
}

function update_cmt() {

  let txt = document.getElementById('umc-txt-' + uid[0]).children[0].innerHTML
  if (txt != '') {
    let cmt = data.comments
    if (uid[1] == null) {
      for (const [k, v] of Object.entries(cmt)) {
        if (v.id == uid[0]) {
          data.comments[k].content = txt
          break
        }
      }
    } else {
      for (const [k, v] of Object.entries(cmt)) {
        if (v.id == uid[1]) {
          for (const [k1, v1] of Object.entries(v.replies)) {
            if (v1.id == uid[0]) {
              data.comments[k].replies[k1].content = txt
              break
            }
          }
          break
        }
      }
    }
    localStorage.setItem('data', JSON.stringify(data))
    load_comments()
  }
}

function upvote(id, rid = null) {
  let cmts = data.comments
  if (rid != null) {
    for (const [k, v] of Object.entries(cmts)) {
      if (v.id == id) {
        let rp = data.comments[k].replies
        for (const [a, b] of Object.entries(rp)) {
          if (b.id == rid) {
            data.comments[k].replies[a].score += 1
            break
          }
        }
        break
      }
    }
    localStorage.setItem('data', JSON.stringify(data))
    load_comments()
    return
  }

  for (const [k, v] of Object.entries(cmts)) {
    if (v.id == id) {
      data.comments[k].score += 1
      break

    }

  }
  localStorage.setItem('data', JSON.stringify(data))
  load_comments()
}


function downvote(id, rid = null) {
  let cmts = data.comments
  if (rid != null) {
    for (const [k, v] of Object.entries(cmts)) {
      if (v.id == id) {
        let rp = data.comments[k].replies
        for (const [a, b] of Object.entries(rp)) {
          if (b.id == rid) {
            data.comments[k].replies[a].score -= 1
            break
          }
        }
        break
      }
    }
    localStorage.setItem('data', JSON.stringify(data))
    load_comments()
    return
  }

  for (const [k, v] of Object.entries(cmts)) {
    if (v.id == id) {
      data.comments[k].score -= 1
      break

    }

  }
  localStorage.setItem('data', JSON.stringify(data))
  load_comments()

}

function tgl_rep(id) {
  let cms = data.comments, idn = ''
  for (const [k, v] of Object.entries(cms)) {
    if (v.id == id) {
      idn = k
      break
    }
  }
  document.getElementById('uc-repc-' + id).classList.toggle('sh_rep')
  document.getElementById('uc-repc-' + id).children[1].innerHTML = ``
}

function send_rep(id, name, rid = null) {
  let txt = ''
  if (rid != null) {
    txt = document.getElementById('uc-repc-' + rid).children[1].innerHTML
  } else {
    txt = document.getElementById('uc-repc-' + id).children[1].innerHTML
  }
  if (txt != '') {
    let tdata = {
      "id": idc + 1,
      "content": txt,
      "createdAt": new Date(),
      "score": 0,
      "user": {
        "image": {
          "png": ci.png,
          "webp": ci.webp
        },
        "username": cu
      },
      "replyingTo": name
    }
    let cmts = data.comments
    for (const [k, v] of Object.entries(cmts)) {
      if (v.id == id) {
        data.comments[k].replies.push(tdata)
        break
      }
    }
    localStorage.setItem('data', JSON.stringify(data))
    load_comments()
  }
}

load_user()

load_comments()
