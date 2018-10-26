import Article from '../RandomArticleGenerator.js';

function getText() {

    return "BigTextSoBigICantLookAtThisInAWholeVision"


}

let articles = [];

for (let i = 0; i < 20; i++) {
    let article = new Article(
        i,
        getText(),
        (new Date(Number(new Date()) + Math.floor(Math.random() * 50))).toDateString(),
        "Reddit" + i
    );
    articles.push(article);

}





// let articles = [{
//         id: 1,
//         text: `I am investigating using ansible for provisioning both servers and desktops.

// Things like adding systems to the domain and adding packages are a flash with ansible. However, many desktop apps are less supported, for example, adding Firefox addons, configuring email clients, changing gui settings in the DE, etc.

// Is there any good solutions or guides for this, for is it outside the typical use case and not super well-supported as I'm guessing it might be?

// TLDR: is the goal of an ansible driven conversion from clean OS install to fully-functional ready-to-use desktop workstation possible, or is that really only possible for servers right now?`,
//         title: "Reddit1",
//         date: (new Date()).toDateString(),
//     },
//     {
//         id: 2,
//         text: `I have a local Yum Repository on Redhat 6 that has worked well for several years. Most of the repos available to the client servers point to this Yum Repo. Some servers with specialized software point directly to the vendor site. The only packages available when running Yum update are the direct vendor repo packages.

// On the Yum server, we run a reposync/createrepo script. (I know it's pretty out of date; working on updating) It appears that reposync is working and I get no errors but I'm beginning to think that no packages are actually being added to the repository. Otherwise, I think I'd receive errors on the client servers. I reviewed the httpd logs on the Yum server and there are no new entries in the error logs and normal entries in the access logs.

// Any troubleshooting ideas would be appreciated.

// I've considered formatting the volume and completely resyncing but not sure if there's any benefit to it.`,
//         date: (new Date()).toDateString(),
//         title: "Reddit2"
//     },
//     {
//         id: 3,
//         text: `Does any one know a site that has the schedule of all the flea markets in Japan? Also, does any one have any tips, recommendations, or things to look at for while at the flea market? I will be traveling all over Japan and would like to hit up as many as possible.`,
//         date: (new Date()).toDateString(),
//         title: "Reddit3"
//     },
//     {
//         id: 4,
//         text: `Hey all! I’m giving away Pokemon codes here again. Except this time I have several different ones to offer. First come first serve. Please let me know if you take some!

// Thundurus/Tornadus:

// A842SD9PFFDEJNSZ A842SPJS8E4EFZFP

// Latias/Latios:

// A86ZXRDULURN49E8

// Reshiram/Zekrom:

// A86946QH7FWAA4ZF A869474WFTXTE9WW A8694744AWKPUSSH

// And finally....Zeraora!:

// A89322RGGMLS63YP`,
//         date: (new Date()).toDateString(),
//         title: "Reddit4"
//     },
//     {
//         id: 5,
//         text: `WARNING !! Discord server is not legit full of bots pure scams ! Do not waste your time , Invisible web is not reliable. They ban me because I asked for help nicely a few times and when I said they was just bots they ban me within seconds !!`,
//         date: (new Date()).toDateString(),
//         title: "Reddit5"
//     },
//     {
//         id: 6,
//         text: `Lorem ipsum dolor sit amet,
//          consectetur adipisicing elit. Quos quas
//           sapiente dolores amet non commodi asperiores
//            vitae temporibus magni facilis odit,
//             autem consectetur unde molestias labore,
//              praesentium assumenda ipsam earum?`,
//         date: (new Date()).toDateString(),
//         title: "Reddit6"
//     },
//     {
//         id: 7,
//         text: `Hello everyone, in advance I would like to thank you for reading it.

// I'm 25M from Rio that wants to move definitely to Aktobe in Kazakhstan. I'm graduating in English on the end of this year and will be able to do my Toelf exam soon. I'm learning Russian using apps but soon I will hire a particular professor to speed things up.

// Reason I really want to leave from Brazil are many; not only the economy is going downhill for a long time now we even have the risk of a new dictatorship. I hate living here for so long (specially the city I live in), a place I hate my entire life, I also have bad relationship with my family so my project is all in my hands. I'm alone in this and any tip or information would be welcome.

// I chose Kazakhstan not only for my interest in the culture of the country and learn both languages (Kazakh and Russian) but our currency have a very similar value. So what I'm saving here it's already something I can calculate to an real value of the money I will have. I can see I will be happy with the weather, people and with my daily life there, finally. It's my "escape route" when things start to get really ugly around here haha I want to be ready to go one year from now maximum. Being preparing myself this year by graduating on my English school. I'm still considering what kind of visa I should try, I'm more focused on getting any kind of job than a student visa to become a true citizen in the country, especially because I can only count with myself.

// -This is not a dream, it's a project- Because projects have begging and a end, we adapt when we need but we know we will conclude.

// I have more details here and there but I'm writing this post because I want a "light" or an idea I haven't though yet. I'm not afraid of working harder or "ugly faces" to myself. I just can't waste more years of my life doing nothing I want or nothing I desired.

// Anything you can say about it, any hint, I thank you in advance)))`,
//         date: (new Date()).toDateString(),
//         title: "Reddit7"
//     },
//     {
//         id: 8,
//         text: `OMGGGGG it's real. NarcoTrafficante must have been listening and knowing hugfucker is stealing connections and using info to help his business. Great that narco would do this for the community to have total privacy. All the messages can optionally be auto encrypted if you have PGP set up. This is an amazing day for the darknet community!`,
//         date: (new Date()).toDateString(),
//         title: "Reddit8"
//     },
//     {
//         id: 9,
//         text: `Why is 0!=1 ?
// So I have pretty much accepted this as a fact, but I always wonder why it's true. Maybe someone on here has a decent explanation? Thanks!`,
//         date: (new Date()).toDateString(),
//         title: "Reddit9"
//     },
//     {
//         id: 10,
//         text: `Hello,

// I read some bad posts about Lighttpd on this sub, but they are 3/4 years old (now it seems almost everyone swears by Nginx/apache combination) , like :

// - "Dead project" ? => last version 1.4.51 (october 2018)

// - "No support for websockets " well it was added to mod_proxy in lighttpd 1.4.46.

// - "Lighttpd devs are jerks" ... ( https://www.reddit.com/r/linuxadmin/comments/24m51p/admins_who_have_used_lighttpd_as_their_web/ch8vu94)`,
//         date: (new Date()).toDateString(),
//         title: "Reddit10"
//     }
// ];
export default articles;