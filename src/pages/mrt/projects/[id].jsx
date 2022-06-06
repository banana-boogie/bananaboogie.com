import axios from "axios";
import * as React from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

import Layout from "@components/Layout";
import SearchInput from "@components/SearchInput";
import TextInput from "@components/TextInput";
import UnstyledButton from "@components/UnstyledButton";
import CommentCard from "@/components/CommentCard";

import { MRT as MRT_CONSTANTS } from "@/contstants";
import Loading from "@/components/Loading";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getServerSideProps(context) {
  const { id } = context.params;
  const project = await prisma.project.findUnique({
    where: {
      id
    },
    include: {
      tags: true
    }
  });
  return {
    props: {
      project: JSON.parse(JSON.stringify(project))
    }
  };
}

const MRT = ({ project }) => {
  const router = useRouter();
  const { id } = router.query;

  const keywordsDefault = MRT_CONSTANTS.keywords.join(", ");

  const [searchTerm, setSearchTerm] = React.useState("");
  const [subreddits, setSubreddits] = React.useState("");
  const [urls, setUrls] = React.useState("");
  const [keywords, setKeywords] = React.useState(keywordsDefault);
  const [searchData, setSearchData] = React.useState(null);
  const [isSearching, setIsSearching] = React.useState(false);

  async function handleKeyDown(event) {
    if (event.key === "Enter") {
      await search();
    }
  }

  async function search() {
    const query = {
      searchTerm,
      keywords,
      subreddits,
      urls
    };
    try {
      setIsSearching(true);
      // const response = await axios.post(`/api/search-reddit`, query);

      const response = {
        data: [
          {
            comment:
              "First stripe feel yesterday. THINK Very excited to start this journey. \n\nEven hear more pleased with how I rolled in our two demo rolls yesterday, nailing two subs we practiced just this week, one on a partner who outranks me, and another on one who’s got 50% weight on me. \n\nGot a great school with great teachers. Gotta get off cloud nine before I get back on the mat though. Miles to go before I sleep.",
            link: "https://reddit.com/r/bjj/comments/v58pqv/promotion_party_megathread/ib9ktfq/",
            author: "Ericspletzer",
            subreddit: "bjj",
            postedAt: "Sun Jun 05 2022",
            threadTitle: "Promotion Party Megathread!",
            keywords: ["great"]
          },
          {
            comment: "She’s wicked, amazing instructor as well",
            link: "https://reddit.com/r/bjj/comments/v5fmny/ffion_davies_becomes_the_first_brit_to_ever_make/ib9srro/",
            author: "gxb20",
            subreddit: "bjj",
            postedAt: "Sun Jun 05 2022",
            threadTitle:
              "Ffion Davies becomes the first Brit to ever make black belt final at IBJJF Worlds",
            keywords: ["amazing"]
          },
          {
            comment:
              "He was a super nice dude and had been coaching all day. I figured he was being nice, tho he wasn’t feeling great, as well, but we had a good roll.",
            link: "https://reddit.com/r/bjj/comments/v55tj1/12_years_of_training_30_matches_5_wins_total/ib8xj6s/",
            author: "Bob002",
            subreddit: "bjj",
            postedAt: "Sun Jun 05 2022",
            threadTitle:
              "12 years of training. 30+ matches. 5 wins total. Today I did something I’ve wanted to do since I started.",
            keywords: ["great"]
          },
          {
            comment:
              "Yeah great guy idk how many times he helped my game tremendously",
            link: "https://reddit.com/r/bjj/comments/v55tj1/12_years_of_training_30_matches_5_wins_total/ib93rzl/",
            author: "Holydiver455",
            subreddit: "bjj",
            postedAt: "Sun Jun 05 2022",
            threadTitle:
              "12 years of training. 30+ matches. 5 wins total. Today I did something I’ve wanted to do since I started.",
            keywords: ["great"]
          },
          {
            comment:
              "Congrats champ. Great work, don't let anybody take anything away from you. You spent 12 years earning that belt, you just happened to receive it at the most recent comp. Oss!",
            link: "https://reddit.com/r/bjj/comments/v55tj1/12_years_of_training_30_matches_5_wins_total/ib94xtt/",
            author: "Ketchup-Chips3",
            subreddit: "bjj",
            postedAt: "Sun Jun 05 2022",
            threadTitle:
              "12 years of training. 30+ matches. 5 wins total. Today I did something I’ve wanted to do since I started.",
            keywords: ["Great"]
          },
          {
            comment:
              "Great to see Brian Campbell getting his chops outside of Boxing",
            link: "https://reddit.com/r/bjj/comments/v55tj1/12_years_of_training_30_matches_5_wins_total/ib9foql/",
            author: "2MainsSellesLoin",
            subreddit: "bjj",
            postedAt: "Sun Jun 05 2022",
            threadTitle:
              "12 years of training. 30+ matches. 5 wins total. Today I did something I’ve wanted to do since I started.",
            keywords: ["Great"]
          },
          {
            comment:
              "Gordon is a douche but to be honest I feel Kaynan is a wasted opportunity. Of course he is at top of the food chain in jiujitsu but his first year as a black belt was something out of this world. He showed a potential to be unbeatable in the sport. I sincerely believed that he was going to be an absolute ADCC champion taking crown from either Gordon or having it given from Galvao. \n\nLater however Kaynan started regularly getting leglocked. He is still one of the best but it's not like I would bet money on him winning a tournament. There are guys who will outperform him.",
            link: "https://reddit.com/r/bjj/comments/v4vicm/since_gordon_thinks_kaynan_is_pathetic_for/ib6ooxb/",
            author: "mckenna36",
            subreddit: "bjj",
            postedAt: "Sat Jun 04 2022",
            threadTitle:
              "Since Gordon thinks Kaynan is pathetic for tapping today, here's a reminder of why Gordon isn't competing this weekend",
            keywords: ["best"]
          },
          {
            comment:
              "Obviously we’re comparing him to other world class blackbelts.\n\nWhen people say a backup QB sucks, they’re not proposing they can pad up and start putting up yards in the NFL.\n\nI hate talking about Gordon bc you guys on both sides get so snippy about every detail of every word anyone says.\n\nCompared to most elite Heavy blackbelts, Kaynan is not a very technical competitor. When he faces more technical opponents, he usually loses or has a poor performance. Does that escape you or are we just not allowed to discuss Jiu Jitsu competitors whatsoever because they’d tap us all?",
            link: "https://reddit.com/r/bjj/comments/v4vicm/since_gordon_thinks_kaynan_is_pathetic_for/ib76tdu/",
            author: "Wavvycrocket",
            subreddit: "bjj",
            postedAt: "Sat Jun 04 2022",
            threadTitle:
              "Since Gordon thinks Kaynan is pathetic for tapping today, here's a reminder of why Gordon isn't competing this weekend",
            keywords: ["hate"]
          },
          {
            comment:
              "He did say the Achilles is much easier to defend with the gi because you can pull their head closer with the jacket, so he was making an observation that he can't imagine a guy that is supposed to be at his own level that doesn't even recognize that. I'm not sure this is him stating that his Gi game is the absolute best, just calling out his weak leglock defense.",
            link: "https://reddit.com/r/bjj/comments/v4vicm/since_gordon_thinks_kaynan_is_pathetic_for/ib7mdra/",
            author: "MetalliMunk",
            subreddit: "bjj",
            postedAt: "Sat Jun 04 2022",
            threadTitle:
              "Since Gordon thinks Kaynan is pathetic for tapping today, here's a reminder of why Gordon isn't competing this weekend",
            keywords: ["best"]
          },
          {
            comment:
              "He’s the literal no gi goat.  He already calls roger the goat in gi.  Gordon doesn’t want to split training in gi and no gi.  He rather focus all his time into one thing and be the best at it",
            link: "https://reddit.com/r/bjj/comments/v4vicm/since_gordon_thinks_kaynan_is_pathetic_for/ib81llt/",
            author: "Full_Hall1362",
            subreddit: "bjj",
            postedAt: "Sat Jun 04 2022",
            threadTitle:
              "Since Gordon thinks Kaynan is pathetic for tapping today, here's a reminder of why Gordon isn't competing this weekend",
            keywords: ["best"]
          },
          {
            comment:
              "&gt;\tHe’s the literal no gi goat\n\n\nMaybe you can make this claim after this ADCC as of right now he is just one of the greatest.        \n\n&gt;\tHe rather focus all his time into one thing and be the best at it\n\n\nGordon is already the best at NoGi at this time (or all time according to you). He would be the best at NoGi even if he does a Gi tournament every once in a while.        \n\nThere are a lot of Gi oriented BJJ players that try out NoGi from time for a new challenge, I don’t know why it’s even controversial to suggest that Gordon should maybe do one instead of fighting the level of competition that he does these days.        \n\nIt’s literally something Gordon himself mentioned he would do a few years back.",
            link: "https://reddit.com/r/bjj/comments/v4vicm/since_gordon_thinks_kaynan_is_pathetic_for/ib82ozz/",
            author: "RZAAMRIINF",
            subreddit: "bjj",
            postedAt: "Sat Jun 04 2022",
            threadTitle:
              "Since Gordon thinks Kaynan is pathetic for tapping today, here's a reminder of why Gordon isn't competing this weekend",
            keywords: ["best"]
          },
          {
            comment:
              "I seem to recall it was on fightpass. So probably the only place to find it. The whole event is worth a watch",
            link: "https://reddit.com/r/bjj/comments/v4vicm/since_gordon_thinks_kaynan_is_pathetic_for/ib6wij9/",
            author: "HappyHoneyBee",
            subreddit: "bjj",
            postedAt: "Sat Jun 04 2022",
            threadTitle:
              "Since Gordon thinks Kaynan is pathetic for tapping today, here's a reminder of why Gordon isn't competing this weekend",
            keywords: ["worth"]
          },
          {
            comment: "Great guy never meddum",
            link: "https://reddit.com/r/bjj/comments/v4vicm/since_gordon_thinks_kaynan_is_pathetic_for/ib6zac5/",
            author: "TaGeuelePutain",
            subreddit: "bjj",
            postedAt: "Sat Jun 04 2022",
            threadTitle:
              "Since Gordon thinks Kaynan is pathetic for tapping today, here's a reminder of why Gordon isn't competing this weekend",
            keywords: ["Great"]
          },
          {
            comment:
              "True. I’m genuinely curious though how he would defend once the guy is belly down. Maybe he only uses preventative defense, but still, that’s guys foot locks are very, very good.",
            link: "https://reddit.com/r/bjj/comments/v4vicm/since_gordon_thinks_kaynan_is_pathetic_for/ib6ndff/",
            author: "Avid23",
            subreddit: "bjj",
            postedAt: "Sat Jun 04 2022",
            threadTitle:
              "Since Gordon thinks Kaynan is pathetic for tapping today, here's a reminder of why Gordon isn't competing this weekend",
            keywords: ["curious"]
          },
          {
            comment:
              "Love the fluidity of this defense and how it progressed to a strong finish. Nice movement.",
            link: "https://reddit.com/r/bjj/comments/v4vicm/since_gordon_thinks_kaynan_is_pathetic_for/ib6vpe1/",
            author: "bertrogdor",
            subreddit: "bjj",
            postedAt: "Sat Jun 04 2022",
            threadTitle:
              "Since Gordon thinks Kaynan is pathetic for tapping today, here's a reminder of why Gordon isn't competing this weekend",
            keywords: ["Love"]
          },
          {
            comment:
              "I disagree on the longevity thing, but everyone's jj style will dictate that. For me, due to the fact I get caught in front head lock attacks way less, my neck absolutely loves and prefers gi.\n\nAlso, sweaty and slipperiness is great for sharpening offense but not good for training good defense. You can get away with a lot of bs, explosive escapes thanks to that. Also it's MUCH easier to disengage in no-gi. \n\nI still like no gi, but you can't throw out getting better with gi training imo. I think a 50/50 or 70/30 (gi/no-gi) splits would be my favorite.\n\nAll that being said, I am a big fan of doing what you enjoy though. That keeps things fun and engages you with the sport that much more, so if no-gi is your jam than keep at it fam. Just know you are missing out on some good lessons in the gi :D.",
            link: "https://reddit.com/r/bjj/comments/v4vicm/since_gordon_thinks_kaynan_is_pathetic_for/ib75o0j/",
            author: "metalfists",
            subreddit: "bjj",
            postedAt: "Sat Jun 04 2022",
            threadTitle:
              "Since Gordon thinks Kaynan is pathetic for tapping today, here's a reminder of why Gordon isn't competing this weekend",
            keywords: ["great"]
          },
          {
            comment:
              "A guy who hasn’t competed regularly in a decade isn’t a great example.",
            link: "https://reddit.com/r/bjj/comments/v4vicm/since_gordon_thinks_kaynan_is_pathetic_for/ib79vzr/",
            author: "Cypher3470",
            subreddit: "bjj",
            postedAt: "Sat Jun 04 2022",
            threadTitle:
              "Since Gordon thinks Kaynan is pathetic for tapping today, here's a reminder of why Gordon isn't competing this weekend",
            keywords: ["great"]
          },
          {
            comment:
              "Where was the money in Gi? ADCC always had the best purses and you could even get paid in regional MMA shows. With a grappling match. IBJJF dominates Gi and only recently started paying at all.",
            link: "https://reddit.com/r/bjj/comments/v4vicm/since_gordon_thinks_kaynan_is_pathetic_for/ib8rtiv/",
            author: "Dristig",
            subreddit: "bjj",
            postedAt: "Sun Jun 05 2022",
            threadTitle:
              "Since Gordon thinks Kaynan is pathetic for tapping today, here's a reminder of why Gordon isn't competing this weekend",
            keywords: ["best"]
          },
          {
            comment:
              "The money came from selling instructionals, doing seminars/privates and getting alot of students/affiliates bevaka you were a champion.\nThese things are still what brings in the cash for the overwhelming amount of the people that make a living in jiujitsu.\n\nThe boring truth is that its the fees from hobbyist students keeping most pros afloat, not some shady Russian or Arab sheik paying big bucks.\n\nI don't know where you are from knowledge very few MMA-promotions have had pure grappling matches om their cards until ONE became a thing.\nAnd at least back in the day smaller MMA-promotions paid peanuts, heck even UFC-fighters back then paid almost nothing to their Mma-fighters.\nNo way that participants in pure grappling matches were paid even close to what the Mma-fighters were.\n\nThe whole reason Metamoris, EBI etc were exciting for alot of people were that for the first time outside of ADCC grapplers were getting decent purses.",
            link: "https://reddit.com/r/bjj/comments/v4vicm/since_gordon_thinks_kaynan_is_pathetic_for/ib8st07/",
            author: "smalltowngrappler",
            subreddit: "bjj",
            postedAt: "Sun Jun 05 2022",
            threadTitle:
              "Since Gordon thinks Kaynan is pathetic for tapping today, here's a reminder of why Gordon isn't competing this weekend",
            keywords: ["overwhelming"]
          },
          {
            comment:
              "&gt;I’ve been in regional Kickboxing and MMA shows since 2000. We had infrequent grappling features on and off the whole time.\n\nAnd what did those pay? Drinks food and at the most a few hundred bucks?\n\n&gt;All the other sources of income are irrelevant to my argument. It was very clear that if you wanted to make a career out of grappling itself you needed to go into no-Gi.\n\nIts really not, and until the late 2010s the way to make a career out of BJJ was what I described. Its the way basically everyone who was only making a career out of BJJ and not crossing over to MMA did.\n\n&gt;It’s the better spectator sport\n\nI'd say it only looks that way on here because reddit is overwhelmingly American.\nNogi is more popular in the US these days because its easier to get into, more similar to MMA and wrestling, the latter which is important because wrestling is so ingrained in US culture.\nJust think about how many posts/discussions there are om this sub about wrestling compared to Judo.\nThe Gi is more traditional and \"old fashioned\" something most Americans don't seem to like either.\n\nIts also easier to follow, most of the bigger promotions use sub-only so no need to understand points and advantages.\n\nIn Europe and Brazil I'd say its the opposite, Gi is much bigger and more popular, both to train and watch.\n\n&gt;It’s easier to argue that we owe Gordon for hyping no-Gi so much and making BJJ a more professional sport.\n\nHonestly thats more on the people that started the promotions like Metamoris, EBI, Polaris and so on, they gave Gordon and others the stage.\nLike mentioned on another thread yesterday Gordon and the DDS would probably not exists if not for the efforts of Gianni Grippo, Eddie Cummings and Khrisna that started the competition class at Renzos so those guys are owed an awful lot to.\n\nIm not sure the development of BJJ going more pro in the way it has the last 5-6 years is the best way it could take but I do prefer it to the way Judo has developed under Olympic rules.",
            link: "https://reddit.com/r/bjj/comments/v4vicm/since_gordon_thinks_kaynan_is_pathetic_for/ib8v65w/",
            author: "smalltowngrappler",
            subreddit: "bjj",
            postedAt: "Sun Jun 05 2022",
            threadTitle:
              "Since Gordon thinks Kaynan is pathetic for tapping today, here's a reminder of why Gordon isn't competing this weekend",
            keywords: ["awful", "best"]
          },
          {
            comment:
              '&gt;you think Eddie Cummings started the competition class at Renzo’s. 😂\n\nThat was Grippo, Eddies contribution to the DDS is his early adoption and development of the leg game that he had started to get into under Krishna.\nHe in turn influenced Gary and Gordon, the rest is history.\n\nBut yeah, agree to disagree, honestly the best part of jiujitsu imo is how diverse and "unbound" it is compared to other martial arts. You do you and I do me but its still all jiujitsu 👍',
            link: "https://reddit.com/r/bjj/comments/v4vicm/since_gordon_thinks_kaynan_is_pathetic_for/ib8wyak/",
            author: "smalltowngrappler",
            subreddit: "bjj",
            postedAt: "Sun Jun 05 2022",
            threadTitle:
              "Since Gordon thinks Kaynan is pathetic for tapping today, here's a reminder of why Gordon isn't competing this weekend",
            keywords: ["best"]
          },
          {
            comment:
              "I think that’s a bit of a bad analogy. Driving is an aspect of golf. Nogi is not an aspect of gi jiu jitsu.  \nGordon has decided to focus on nogi. And is arguably the best in the world. \nCritising Gordon for not doing Gi is like criticising Gi guys for not fighter mma/vale tudo",
            link: "https://reddit.com/r/bjj/comments/v4vicm/since_gordon_thinks_kaynan_is_pathetic_for/ib7hv44/",
            author: "Mellor88",
            subreddit: "bjj",
            postedAt: "Sat Jun 04 2022",
            threadTitle:
              "Since Gordon thinks Kaynan is pathetic for tapping today, here's a reminder of why Gordon isn't competing this weekend",
            keywords: ["best"]
          },
          {
            comment:
              "I used to be really excited about a Gordon vs Kaynan match, but lately it feels more like how I was excited about Khabib vs Tony in 2015; not anymore.\n\nSure Gordon's personality seems toxic, but I don't think there's much doubt that he's the best nogi grappler in the world.\n\nFunny anecdote:  Daniel Manasoui basically won west coast trials at heavyweight (pulled guard in the last minute or so of the finals when he was up) and then easily won the African/Middle East trials. I'd give him a decent chance against Kaynan. I was watching an interview with him on flow and when asked about Gordon his response was \"Gordon beats me like a little f\\*\\*\\*ing boy\". Say what you want about Gordon, but no one is better at jiu-jitsu\".",
            link: "https://reddit.com/r/bjj/comments/v4vicm/since_gordon_thinks_kaynan_is_pathetic_for/ib7g4nc/",
            author: "Spryj6",
            subreddit: "bjj",
            postedAt: "Sat Jun 04 2022",
            threadTitle:
              "Since Gordon thinks Kaynan is pathetic for tapping today, here's a reminder of why Gordon isn't competing this weekend",
            keywords: ["best"]
          },
          {
            comment:
              "Gordon is great at jiu-jitsu - just not in the gi.\n\nSo when he talks shit about a world champion gi guy losing a match at black belt it's pretty funny",
            link: "https://reddit.com/r/bjj/comments/v4vicm/since_gordon_thinks_kaynan_is_pathetic_for/ib6msmj/",
            author: "Ok-Neck-4757",
            subreddit: "bjj",
            postedAt: "Sat Jun 04 2022",
            threadTitle:
              "Since Gordon thinks Kaynan is pathetic for tapping today, here's a reminder of why Gordon isn't competing this weekend",
            keywords: ["great"]
          },
          {
            comment:
              " \nAfter he gave up the gi plan, he said something like “The gi sucks. Some random blue belt can just hold me in place.” Then, more recently, he was training with Meregali and said “now that I’m not trying to be the best, I actually like the gi.”",
            link: "https://reddit.com/r/bjj/comments/v4vicm/since_gordon_thinks_kaynan_is_pathetic_for/ib6fsay/",
            author: "WriteOnceCutTwice",
            subreddit: "bjj",
            postedAt: "Sat Jun 04 2022",
            threadTitle:
              "Since Gordon thinks Kaynan is pathetic for tapping today, here's a reminder of why Gordon isn't competing this weekend",
            keywords: ["best"]
          },
          {
            comment:
              "Don't get me wrong, I hate things like stalling in 50/50 guard in the Gi but I think its more about the ruleset than Gi/Nogi.\n\n I mean EBI is basically just stalling until overtime comes into play, Nogi double Guard pulls into leg-spaghetti spam isn't exactly fast paced and closed guard is basically banned in Quintet rules because its so common to stall in it in Nogi.\n\nThe potential to slow down the pace is greater in the Gi sure, but I think the notion that Nogi ALWAYS has a faster pace stems from the fact that sub-only is more common in Nogi.\nSub-only encourages a higher pace in general because points and advantages doesn't need to be retained.",
            link: "https://reddit.com/r/bjj/comments/v4vicm/since_gordon_thinks_kaynan_is_pathetic_for/ib87uxs/",
            author: "smalltowngrappler",
            subreddit: "bjj",
            postedAt: "Sat Jun 04 2022",
            threadTitle:
              "Since Gordon thinks Kaynan is pathetic for tapping today, here's a reminder of why Gordon isn't competing this weekend",
            keywords: ["hate"]
          },
          {
            comment:
              "I love Tye so much he tries his hardest to make everything so entertaining. He just looks so free when he competes",
            link: "https://reddit.com/r/bjj/comments/v5hlbl/ibjjf_worlds_2022_final_day_discussion_thread/ib9sngr/",
            author: "KevD95",
            subreddit: "bjj",
            postedAt: "Sun Jun 05 2022",
            threadTitle: "IBJJF Worlds 2022 Final Day Discussion Thread",
            keywords: ["love"]
          },
          {
            comment:
              "I love that he looks like he’s out there trying to actually win, he was up on points the entire match versus Lucas and continued to engage and score.",
            link: "https://reddit.com/r/bjj/comments/v5hlbl/ibjjf_worlds_2022_final_day_discussion_thread/ib9t2co/",
            author: "GrapplingRewind",
            subreddit: "bjj",
            postedAt: "Sun Jun 05 2022",
            threadTitle: "IBJJF Worlds 2022 Final Day Discussion Thread",
            keywords: ["love"]
          },
          {
            comment:
              "That was a great match again from Tye! that double neck pulling really wears people down it seems",
            link: "https://reddit.com/r/bjj/comments/v5hlbl/ibjjf_worlds_2022_final_day_discussion_thread/ib9sztj/",
            author: "schutyser",
            subreddit: "bjj",
            postedAt: "Sun Jun 05 2022",
            threadTitle: "IBJJF Worlds 2022 Final Day Discussion Thread",
            keywords: ["great"]
          },
          {
            comment:
              "Actually, that was a great combination. He started to put one of his legs between his opponent legs to sit down and get an outside ashi. But then he switched to literally an Imanari Roll to get the Inside Heelhook with perfect control of the secondary leg. Pretty modern for 2008 I would say. Maybe a time traveler;-)",
            link: "https://reddit.com/r/bjj/comments/v57rio/jorge_santiago_rolls_into_a_heel_hook_at_sengoku/ib9dznu/",
            author: "EffortlessJiuJitsu",
            subreddit: "bjj",
            postedAt: "Sun Jun 05 2022",
            threadTitle:
              "Jorge Santiago Rolls Into A Heel Hook At Sengoku 6 in 2008",
            keywords: ["great"]
          },
          {
            comment:
              "Still a better performance than all the people who are too scared to compete. Well done.",
            link: "https://reddit.com/r/bjj/comments/v5g69u/had_my_second_competition_today/ib9hvzs/",
            author: "Willing_Praline6340",
            subreddit: "bjj",
            postedAt: "Sun Jun 05 2022",
            threadTitle: "had my second competition today",
            keywords: ["scared"]
          },
          {
            comment:
              "Like the others have said; it’s better than not competing and thinking you’re better than you really are. Now you probably know what you need to work on and can improve better than if you didn’t compete. It keeps your Jiu jitsu honest. \n\nWin or lose really doesn’t matter. As a hobbyist the best you get is some cheap medal for winning it all. The important thing is what you learn from the experience.",
            link: "https://reddit.com/r/bjj/comments/v5g69u/had_my_second_competition_today/ib9mhtu/",
            author: "TruthReveals",
            subreddit: "bjj",
            postedAt: "Sun Jun 05 2022",
            threadTitle: "had my second competition today",
            keywords: ["best"]
          },
          {
            comment:
              "I’m always in awe of anyone that can sack up and compete! I have yet to take that step. So while you might not feel great about your game right now, there’s a bunch of us that want to be you!",
            link: "https://reddit.com/r/bjj/comments/v5g69u/had_my_second_competition_today/ib9njpf/",
            author: "FranklieAM1776",
            subreddit: "bjj",
            postedAt: "Sun Jun 05 2022",
            threadTitle: "had my second competition today",
            keywords: ["great"]
          },
          {
            comment:
              "I competed for the first time with like 4 months of training under my belt, I also got wrecked haha no big deal. It SUCKED and I felt like trash the whole day and next day but the following week I felt amazing in training.",
            link: "https://reddit.com/r/bjj/comments/v5g69u/had_my_second_competition_today/ib9s914/",
            author: "teethteetheat",
            subreddit: "bjj",
            postedAt: "Sun Jun 05 2022",
            threadTitle: "had my second competition today",
            keywords: ["amazing"]
          },
          {
            comment:
              "If I hadn’t been doing a local tourney, I might have been there. Jon and company do a fantastic job.",
            link: "https://reddit.com/r/bjj/comments/v556j6/tap_cancer_out_was_in_denver_today_the_tournament/ib8jywv/",
            author: "Bob002",
            subreddit: "bjj",
            postedAt: "Sun Jun 05 2022",
            threadTitle:
              "Tap Cancer Out was in Denver today. The tournament ran so smooth, love the organization!",
            keywords: ["fantastic"]
          },
          {
            comment:
              "Crucifix.\n\nMy reasoning: while some people my argue that something like the twister is the way to go. The twister doesn't quite translate it's effectiveness to anyone who doesn't know the sport. Crucifix on the other hand might not be as mean as the twister but it's effective and decently flashy. Even someone who doesn't know anything about rolling or how submission work. You just have to look at it and know the guy with his arms spread wide open is not in a good place. \n\nBonus points: if you set it up right, you can strangle or break the guys neck while facing the warlord. He'll be able to watch the suffering on the guys face. I'd say that's worth a shot.",
            link: "https://reddit.com/r/bjj/comments/v57ukm/screw_most_effective_or_highest_percentage_what/ib897j3/",
            author: "nawakilla",
            subreddit: "bjj",
            postedAt: "Sun Jun 05 2022",
            threadTitle:
              "Screw most effective or highest percentage. What, in your personal opinion, is the coolest submission in BJJ?",
            keywords: ["worth"]
          },
          {
            comment:
              "Agreed. Ill add on and say the Assassin choke that Baret Yoshida is making famous from Crucifix in the Gi is the coolest in my opinion. If you’re curious check out his IG page he posts them allll the time: @baret75",
            link: "https://reddit.com/r/bjj/comments/v57ukm/screw_most_effective_or_highest_percentage_what/ib9bgcz/",
            author: "pussygetter69",
            subreddit: "bjj",
            postedAt: "Sun Jun 05 2022",
            threadTitle:
              "Screw most effective or highest percentage. What, in your personal opinion, is the coolest submission in BJJ?",
            keywords: ["curious"]
          },
          {
            comment:
              "I love hitting this on whitebelts but it doesn't really ever work on anyone good :(",
            link: "https://reddit.com/r/bjj/comments/v57ukm/screw_most_effective_or_highest_percentage_what/ib9r4x4/",
            author: "CurtisJaxon",
            subreddit: "bjj",
            postedAt: "Sun Jun 05 2022",
            threadTitle:
              "Screw most effective or highest percentage. What, in your personal opinion, is the coolest submission in BJJ?",
            keywords: ["love"]
          },
          {
            comment: "KIMURA. It’s literally the best move",
            link: "https://reddit.com/r/bjj/comments/v57ukm/screw_most_effective_or_highest_percentage_what/ib99fcd/",
            author: "Whos_the_NPC",
            subreddit: "bjj",
            postedAt: "Sun Jun 05 2022",
            threadTitle:
              "Screw most effective or highest percentage. What, in your personal opinion, is the coolest submission in BJJ?",
            keywords: ["best"]
          },
          {
            comment:
              "I love to do the no-gi bow and arrow off the gift wrap. Low percentage, but when you get it, it crushes souls.",
            link: "https://reddit.com/r/bjj/comments/v57ukm/screw_most_effective_or_highest_percentage_what/ib8x3nt/",
            author: "littlebighuman",
            subreddit: "bjj",
            postedAt: "Sun Jun 05 2022",
            threadTitle:
              "Screw most effective or highest percentage. What, in your personal opinion, is the coolest submission in BJJ?",
            keywords: ["love"]
          },
          {
            comment: "I love a good gogoclinch",
            link: "https://reddit.com/r/bjj/comments/v57ukm/screw_most_effective_or_highest_percentage_what/ib9afnz/",
            author: "Mindseye018",
            subreddit: "bjj",
            postedAt: "Sun Jun 05 2022",
            threadTitle:
              "Screw most effective or highest percentage. What, in your personal opinion, is the coolest submission in BJJ?",
            keywords: ["love"]
          },
          {
            comment:
              "For sure.  I had my first comp in early Feb and it exactly that.  I was easily in the best shape of my life and no cardio issues while rolling in class…. 30 seconds into the match I had an adrenline drop - grips were shot and completely gassed, lol.  I ended up winning the match, but the first 2 minutes were really terrible.\n\nI ended up competing again  a few weeks later and things were much more steady (as steady as they get for a 40 y/o white belt)",
            link: "https://reddit.com/r/bjj/comments/v5a1yg/how_do_you_guys_prepare_for_the_competition/ib9n7xf/",
            author: "crabgrass-1981",
            subreddit: "bjj",
            postedAt: "Sun Jun 05 2022",
            threadTitle:
              "How do you guys prepare for the competition intensity?",
            keywords: ["best"]
          },
          {
            comment:
              "Which plan did you followed for the full?   Almost sounds like a modified Hanson's.   There are many schools of thought on how best to attack the run depending on volume, level, and ultimately goal.   Just like anything, not one plan is the best but most will get you over the line.",
            link: "https://reddit.com/r/bjj/comments/v5a1yg/how_do_you_guys_prepare_for_the_competition/ib9nsyf/",
            author: "runwichi",
            subreddit: "bjj",
            postedAt: "Sun Jun 05 2022",
            threadTitle:
              "How do you guys prepare for the competition intensity?",
            keywords: ["best"]
          },
          {
            comment:
              "This right here. I love doing 2 minutes of rolling with 30 seconds rest. Also look up some sports psych techniques you likely had an adrenaline dump as well, leaving to mitigate it will save your energy levels.",
            link: "https://reddit.com/r/bjj/comments/v5a1yg/how_do_you_guys_prepare_for_the_competition/ib916be/",
            author: "Almondbutterandjelly",
            subreddit: "bjj",
            postedAt: "Sun Jun 05 2022",
            threadTitle:
              "How do you guys prepare for the competition intensity?",
            keywords: ["love"]
          },
          {
            comment:
              "I think everyone requires a different approach to competition. I experimented with every approach I can think of from warming up a lot prior to drain some nervous energy, I tried trying to hype myself up with a lot of intesity, calming meditation, aggressive music, calming music, etc. I found what worked best for me was just to approach the same way I approach an open mat. Light warm up and not give a fuck.",
            link: "https://reddit.com/r/bjj/comments/v5a1yg/how_do_you_guys_prepare_for_the_competition/ib9cdve/",
            author: "dobermannbjj84",
            subreddit: "bjj",
            postedAt: "Sun Jun 05 2022",
            threadTitle:
              "How do you guys prepare for the competition intensity?",
            keywords: ["best"]
          },
          {
            comment:
              "I will be entering my 30s soon and i know good warm ups will become more and more important to prevent injuries, but man am i hesitant. The thought of wasting my (very limited) cardio on warm up and then suddenly runnign empty in the middle of a match is scary.",
            link: "https://reddit.com/r/bjj/comments/v5a1yg/how_do_you_guys_prepare_for_the_competition/ib9638c/",
            author: "samaldin",
            subreddit: "bjj",
            postedAt: "Sun Jun 05 2022",
            threadTitle:
              "How do you guys prepare for the competition intensity?",
            keywords: ["scary"]
          },
          {
            comment:
              "If you couldn't recover from using enough energy to get a sweat going to go roll hard, you wouldn't even be making it through class.  \n\n\nIdk about you but my best roll of the day isn't the first anyways, it's when I'm fully warmed up and in the moment",
            link: "https://reddit.com/r/bjj/comments/v5a1yg/how_do_you_guys_prepare_for_the_competition/ib99lt2/",
            author: "saharizona",
            subreddit: "bjj",
            postedAt: "Sun Jun 05 2022",
            threadTitle:
              "How do you guys prepare for the competition intensity?",
            keywords: ["best"]
          },
          {
            comment:
              "That's actually pretty good tbh. Oddly enough, my best warm up routine so far has been a long, chill mobility workout morning of. After that, I found an easy warm up, just a few minutes, and focus on mental preparation works best for me. And with jj comp you do not get a ton of notice of your match time unfortunately, unlike other sports, so timing the warm up you described can be difficult and lead to too much warming up and cooling down.",
            link: "https://reddit.com/r/bjj/comments/v5a1yg/how_do_you_guys_prepare_for_the_competition/ib9fppy/",
            author: "metalfists",
            subreddit: "bjj",
            postedAt: "Sun Jun 05 2022",
            threadTitle:
              "How do you guys prepare for the competition intensity?",
            keywords: ["best"]
          },
          {
            comment:
              "I had my first comp in Feb and same exact story.  It’s an adrenaline dump.  Easily best shape of my life and no issues rolling in class.\n\nStart of the match, I locked up, and went for a bad double leg.  After that my adrenaline was dumped - and was hanging on for dear life.  The next 2 minute we’re terrible, but fortunaly we rolled out of bounds and had to reset.  That gave me a little time to get some composure back and eventually win.\n\nI competed 3 weeks later and didn’t have as much of an issue.  I am sure if I do it more it will get better.  Same with you",
            link: "https://reddit.com/r/bjj/comments/v5a1yg/how_do_you_guys_prepare_for_the_competition/ib9o7e0/",
            author: "crabgrass-1981",
            subreddit: "bjj",
            postedAt: "Sun Jun 05 2022",
            threadTitle:
              "How do you guys prepare for the competition intensity?",
            keywords: ["best"]
          },
          {
            comment:
              "About three weeks ago, one of my best friends and training partners spent a week guiding Demian in a turkey hunt. They hunted and fished and talked about Jiu Jitsu for a solid week. We have not heard the end of it.",
            link: "https://reddit.com/r/bjj/comments/v4phi3/damian_maia_squeezes_until_rick_storys_head_pops/ib8u9q3/",
            author: "FoxDiscombobulated38",
            subreddit: "bjj",
            postedAt: "Sun Jun 05 2022",
            threadTitle: "Damian Maia squeezes until Rick Story’s head pops",
            keywords: ["best"]
          },
          {
            comment:
              "&gt; I have a major fear of blood and wouldn't do that on purpose.\n\nWow! So you wouldn't wreck a guy's face cos the sight of blood makes *you* queezy?\n\nWhere does *his* health and safety come into this? That's all about *you*.\n\nWhat would I propose you do?\n\nWell, since you asked I'd recommend you recognise the other person as a person.\n\nNext, understand they're simply lending you their body for a few minutes so you can both have some fun… but *they're* going to need that body even 60 to 80 years from now so they want it back in good condition.\n\nYou get 5 minutes of fun and then you say, \"Oh whoopsie. Sorry. I hate the sight of blood\".\n\nMeanwhile they have 60 years of a clicking jaw and expensive dental needs thereafter. You tell a little story of a whoopsie, their jaw clicks for 60, long, annoying, \"if I'd never gone to that one fucking class\" years.\n\nSo here's the tip… as an instructor of mine used to say…\n\nBe sorry *before* you hurt the person. There's no point waiting till after.",
            link: "https://reddit.com/r/bjj/comments/v4phi3/damian_maia_squeezes_until_rick_storys_head_pops/ib9kaiy/",
            author: "wilbur111",
            subreddit: "bjj",
            postedAt: "Sun Jun 05 2022",
            threadTitle: "Damian Maia squeezes until Rick Story’s head pops",
            keywords: ["hate"]
          },
          {
            comment:
              "That match was so weird. Musumeci is an incredible talent but the fact that as a BJJ Black Belt who has high-level competition and weighs 160 pounds more than him in the person of Seif, would it be fair to say he should have passed his guard, or at least gotten an advantage?",
            link: "https://reddit.com/r/bjj/comments/v4wxmq/weight_cutting_is_getting_out_of_control_at_worlds/ib7o3o0/",
            author: "high_technic",
            subreddit: "bjj",
            postedAt: "Sat Jun 04 2022",
            threadTitle: "Weight cutting is getting out of control at Worlds.",
            keywords: ["incredible"]
          },
          {
            comment:
              "Never underestimate ability of somebody far smaller than you to be an annoying spider monkey, especially if they're sitting guard and not really trying to do much themselves.\n\nNot that size isn't an advantage, of course, but the big guy is overwhelmingly going to get pinged for stalling in openweight.\n\nI've had a few absolute competitions where I'm the 6'4 280er against the 5'7 160er 18 year old Berimbolo prodigy who spins around on their head for 10 mins and will not tap in any situation and I'd honestly prefer closing out the vast majority of the time. Nobody's cheering for Goliath against David, I'll feel pretty awful if I injure the smaller person, the reffing is generally pretty one-sided (Understandable but annoying) and the nature of the size mismatch makes for boring jiujitsu.",
            link: "https://reddit.com/r/bjj/comments/v4wxmq/weight_cutting_is_getting_out_of_control_at_worlds/ib7xgbq/",
            author: "gugabe",
            subreddit: "bjj",
            postedAt: "Sat Jun 04 2022",
            threadTitle: "Weight cutting is getting out of control at Worlds.",
            keywords: ["awful"]
          },
          {
            comment:
              "I hate that match so much. Everyone was talking about how it was the representation of pure jiu jitsu, ooooo look at this really small guy beat this really big guy. It was 10 minutes of *nothing* where Seif lost because he tried to fall on Mikey and flatten him twice.",
            link: "https://reddit.com/r/bjj/comments/v4wxmq/weight_cutting_is_getting_out_of_control_at_worlds/ib9phop/",
            author: "invrsleep",
            subreddit: "bjj",
            postedAt: "Sun Jun 05 2022",
            threadTitle: "Weight cutting is getting out of control at Worlds.",
            keywords: ["hate"]
          },
          {
            comment:
              "Just watched this match. Hot Take coming from someone who is 300 pounds but can also berimbolo. \n\nI fucking hate watching ultra heavy for this very reason and hate competing in it. The amount of matches I have done or watched where two big guys just hold each other for 95% of the match only to almost get doubled dqed before a sloppy takedown attempt or someone concedes to pull guard is absurd.\n\nI get it, everyone wants to win and in that division the big big guys know they have zero chance on bottom but Jesus it's boring to watch.\n\nI pull guard just about every competition and either it works or it ends up being 0-0 I lose refs decision due to being on bottom. But I went to do jiujitsu not play touch butt in the park.",
            link: "https://reddit.com/r/bjj/comments/v4wxmq/weight_cutting_is_getting_out_of_control_at_worlds/ib9a91f/",
            author: "TheBjjAmish",
            subreddit: "bjj",
            postedAt: "Sun Jun 05 2022",
            threadTitle: "Weight cutting is getting out of control at Worlds.",
            keywords: ["hate"]
          },
          {
            comment:
              "One of the better tldr’s I found. Basically it softens/erodes enamel and brushes the acidic solution (your saliva) through a now more porous protective layer to the dentin underneath. \n\nBest practice is to rinse your mouth with water after coffee and brush only after 30 min. \n\n&gt; The reason for this has to do with how tooth enamel is composed. Enamel is the hardest tissue in the body but also one of the most porous. It’s made of hydroxyapatite crystals (mostly calcium phosphate), which are generally tightly bound together. If you regularly drink coffee or other acidic beverages, over time that tight binding begins to loosen, and more of the pores open up. \n\n&gt; In other words, your enamel becomes more vulnerable to acid attacks. When you drink coffee, it bathes the teeth in an acid solution; then, when you brush your teeth right away, that same acid gets brushed into those newly opened pores. This combination can cause significant damage to the tooth’s surface and cause the stain to stick to the teeth, says Dr. Yazdani.\n\nhttps://parade.com/1355498/kaitlin-vogel/should-you-brush-your-teeth-before-or-after-coffee/amp/",
            link: "https://reddit.com/r/bjj/comments/v5dwxj/am_class_guys_whats_your_routine/ib9kk33/",
            author: "MentalValueFund",
            subreddit: "bjj",
            postedAt: "Sun Jun 05 2022",
            threadTitle: "AM class guys, what's your routine",
            keywords: ["Best", "hate"]
          },
          {
            comment:
              "I hate rolling on full stomach. I get some water before 6 am class and that's it. \n\nEnjoy your morning coffee and don't worry about your breath, it will help wake them up.",
            link: "https://reddit.com/r/bjj/comments/v5dwxj/am_class_guys_whats_your_routine/ib96igm/",
            author: "PattonPending",
            subreddit: "bjj",
            postedAt: "Sun Jun 05 2022",
            threadTitle: "AM class guys, what's your routine",
            keywords: ["hate"]
          },
          {
            comment:
              "id love a coffee, but coffee breath is nasty so that's a no go",
            link: "https://reddit.com/r/bjj/comments/v5dwxj/am_class_guys_whats_your_routine/ib957mo/",
            author: "Omoplata_Terror",
            subreddit: "bjj",
            postedAt: "Sun Jun 05 2022",
            threadTitle: "AM class guys, what's your routine",
            keywords: ["love"]
          },
          {
            comment:
              "Wake up, make cup of instant coffee, shower, put on Gi, get to class. Mine is super early, and I hate waking up early. The coffee is mandatory\n\nI eat after",
            link: "https://reddit.com/r/bjj/comments/v5dwxj/am_class_guys_whats_your_routine/ib95x0h/",
            author: "WillPlaysBJJ",
            subreddit: "bjj",
            postedAt: "Sun Jun 05 2022",
            threadTitle: "AM class guys, what's your routine",
            keywords: ["hate"]
          },
          {
            comment:
              "I can't get over this video lol. dude pounded his chest and pointed at his team like \" we did it!!! DQ'd him, baby!! we did it!!!! game plan worked!!\"\n\nugh I hate hating on people but what a clown. who is he? hobbyist just happy to be there or is he just an idiot?",
            link: "https://reddit.com/r/bjj/comments/v4xvhk/foot_lock_dq/ib6ow5k/",
            author: "irantellus",
            subreddit: "bjj",
            postedAt: "Sat Jun 04 2022",
            threadTitle: "Foot Lock DQ",
            keywords: ["hate"]
          },
          {
            comment:
              "Ehh, I'll never know what it's like to be competing at that level, so I'm just some chubby asshole with an opinion, but it never really sits well with me when people celebrate winning on a technicality. I feel like the attitude here should be more like \"Fuck, not the best circumstances, but I'm happy I'm moving in!\" not \"Woohoo! I don't care how it happens as long as I get to the finals!\"",
            link: "https://reddit.com/r/bjj/comments/v4xvhk/foot_lock_dq/ib85zm3/",
            author: "Tal_Vez_Autismo",
            subreddit: "bjj",
            postedAt: "Sat Jun 04 2022",
            threadTitle: "Foot Lock DQ",
            keywords: ["best"]
          },
          {
            comment:
              "I can’t get over this comment lol. dude talking as he was over the top and disrespectful.\n\nugh I hate hating on people but what a clown. who is he? professional hater with a hyperbole complex or is he just an idiot?",
            link: "https://reddit.com/r/bjj/comments/v4xvhk/foot_lock_dq/ib8796h/",
            author: "Itoigawa_",
            subreddit: "bjj",
            postedAt: "Sat Jun 04 2022",
            threadTitle: "Foot Lock DQ",
            keywords: ["hate"]
          },
          {
            comment:
              "Sorry fairly new to Bjj community at large. Why the hobbyist tag? I’m sure there are less dedicated black belts out there, but a black belt at a huge a event like that seems like that is this person’s lifestyle. Again, no hate just curious if that’s an average approach to a situation like this?",
            link: "https://reddit.com/r/bjj/comments/v4xvhk/foot_lock_dq/ib76ck9/",
            author: "742N",
            subreddit: "bjj",
            postedAt: "Sat Jun 04 2022",
            threadTitle: "Foot Lock DQ",
            keywords: ["hate", "curious"]
          },
          {
            comment: "100% fail, imo.",
            link: "https://reddit.com/r/bjj/comments/v56ora/right_call_or_ref_fail_kennedy_maciel_gets_dqd_at/ib83fz5/",
            author: "MFSimpson",
            subreddit: "bjj",
            postedAt: "Sat Jun 04 2022",
            threadTitle:
              "Right call or ref fail? Kennedy Maciel gets DQ'd at Worlds",
            keywords: ["fail"]
          },
          {
            comment:
              "Imagine a keyboard warrior trying to anonymously shit on someone who is trying to compete against the best in the world.",
            link: "https://reddit.com/r/bjj/comments/v4oglg/i_ate_shit_in_my_second_match_but_heres_one_of_my/ib6owxv/",
            author: "Kazparov",
            subreddit: "bjj",
            postedAt: "Sat Jun 04 2022",
            threadTitle:
              "I ate shit in my second match but here’s one of my bolos from my first match at worlds",
            keywords: ["best"]
          },
          {
            comment:
              "Hahahaha, you know who Varun is, right?\n\nEdit: Also, purple belts are best in world?",
            link: "https://reddit.com/r/bjj/comments/v4oglg/i_ate_shit_in_my_second_match_but_heres_one_of_my/ib6p30g/",
            author: "Nowaymannowayjose",
            subreddit: "bjj",
            postedAt: "Sat Jun 04 2022",
            threadTitle:
              "I ate shit in my second match but here’s one of my bolos from my first match at worlds",
            keywords: ["best"]
          },
          {
            comment:
              "Purple belts competing in the adult division at the worlds yes are the best purples in the world.   \n\n\nYou can shit on him for sandbagging but it's not his decision what belt he wears.",
            link: "https://reddit.com/r/bjj/comments/v4oglg/i_ate_shit_in_my_second_match_but_heres_one_of_my/ib6pkw7/",
            author: "Kazparov",
            subreddit: "bjj",
            postedAt: "Sat Jun 04 2022",
            threadTitle:
              "I ate shit in my second match but here’s one of my bolos from my first match at worlds",
            keywords: ["best"]
          },
          {
            comment:
              "Mate, I’d be a hundred percent with you if it wasn’t for knowing him in the real world.\n\nVarun is a Gordon-lite with no skill to back it up. He talks shit constantly online, tries to justify his sandbagging, then looks like a little scared cat in person at tournaments. \n\nEven his closest training partners (at his “Secret Kumite in the Woods”) openly talk about how much he is a nancy boy. He’s just good enough to be a punching bag for them, that’s why they keep him around.\n\nHe is exactly what is wrong with jiu jitsu culture and we have to stamp out guys like this.",
            link: "https://reddit.com/r/bjj/comments/v4oglg/i_ate_shit_in_my_second_match_but_heres_one_of_my/ib7e83n/",
            author: "Nowaymannowayjose",
            subreddit: "bjj",
            postedAt: "Sat Jun 04 2022",
            threadTitle:
              "I ate shit in my second match but here’s one of my bolos from my first match at worlds",
            keywords: ["scared"]
          },
          {
            comment:
              "You’re literally describing Varun to a tee in your first paragraph. Well, it should be a paragraph.\n\nThe hypocrisy is hilarious.\n\nEdit: And sure, are you guys training tomorrow? I know Varun is in the US, so I’d love to come through. DM me.",
            link: "https://reddit.com/r/bjj/comments/v4oglg/i_ate_shit_in_my_second_match_but_heres_one_of_my/ib8dj7g/",
            author: "Nowaymannowayjose",
            subreddit: "bjj",
            postedAt: "Sun Jun 05 2022",
            threadTitle:
              "I ate shit in my second match but here’s one of my bolos from my first match at worlds",
            keywords: ["love"]
          },
          {
            comment:
              "What a coincidence, I went up against my divisions winner, and also ate shit! Amazing bolo btw.",
            link: "https://reddit.com/r/bjj/comments/v4oglg/i_ate_shit_in_my_second_match_but_heres_one_of_my/ib7j3c4/",
            author: "thenamesweretake",
            subreddit: "bjj",
            postedAt: "Sat Jun 04 2022",
            threadTitle:
              "I ate shit in my second match but here’s one of my bolos from my first match at worlds",
            keywords: ["Amazing"]
          },
          {
            comment:
              "If this is your first comp, id for sure do the beginner div. You're close enough to that line. \n\n\nIf you've already done bjj competitions, you should just challenge yourself and compete in intermediate. There's way too many people sandbagging because they're scared of losing.",
            link: "https://reddit.com/r/bjj/comments/v5e63p/am_i_a_prick_if_i_compete_in_the_beginner_division/ib9k0a2/",
            author: "DurableLeaf",
            subreddit: "bjj",
            postedAt: "Sun Jun 05 2022",
            threadTitle: "Am I a prick if I compete in the beginner division?",
            keywords: ["scared"]
          },
          {
            comment:
              "It’s so unfortunate because his game looks incredible in sparring footage.",
            link: "https://reddit.com/r/bjj/comments/v51b08/the_ruotolo_vs_jonatha_alves_worlds/ib83osy/",
            author: "djchillychill",
            subreddit: "bjj",
            postedAt: "Sat Jun 04 2022",
            threadTitle: "The Ruotolo vs Jonatha Alves @ Worlds",
            keywords: ["incredible"]
          },
          {
            comment:
              "Wow, no shit??  I actually didn’t think I saw much stalling this match, much less 3X.  It is an absolutely impossible task to slow Tye down and he barely did, plenty of scrambles, etc., so hard for me to believe.  I’ve definitely seen worse at ibjjf.  \n\nSide note:  didn’t Alves get injured last year for worlds?  If that’s the case, this is two awful experiences in a row.  That’s gotta hurt.",
            link: "https://reddit.com/r/bjj/comments/v51b08/the_ruotolo_vs_jonatha_alves_worlds/ib763ib/",
            author: "makerbrah",
            subreddit: "bjj",
            postedAt: "Sat Jun 04 2022",
            threadTitle: "The Ruotolo vs Jonatha Alves @ Worlds",
            keywords: ["awful"]
          },
          {
            comment:
              "I train with tye pretty often and no one’s beating him without slowing him down. He’s too good at scrambling and doesn’t get tired \n\nStalling tye out was the only chance jonatha had at winning. He gave it his best shot and it didn’t workout. \n\nIf they were to both open up and go move for move tye beats him the way he beat Levi",
            link: "https://reddit.com/r/bjj/comments/v51b08/the_ruotolo_vs_jonatha_alves_worlds/ib7conv/",
            author: "Zlec3",
            subreddit: "bjj",
            postedAt: "Sat Jun 04 2022",
            threadTitle: "The Ruotolo vs Jonatha Alves @ Worlds",
            keywords: ["best"]
          },
          {
            comment:
              "visiting waikiki for a few weeks.  Looking for a school that has no gi-kids classes. I have a 9 and 14 year old, would be great if they could be in the same class.\n\nIsland BJJ looked fine, but their site says they arent allowing any drop ins or off island.\n\nAny no gi open mats?",
            link: "https://www.reddit.com/r/bjj/comments/v5gdad/where_to_train_in_waikiki_honolulu_nogi/",
            author: "atx78701",
            subreddit: "bjj",
            postedAt: "Sun Jun 05 2022",
            threadTitle: "Where to train in waikiki / honolulu (no-gi)",
            keywords: ["great"]
          },
          {
            comment:
              "apologies for bothering so much but I'm just very scared at the moment. Do you think I'd be able to be back at dancing like before without worrying? I also can't gain weight so just the excercises my pt gives me should be enough right?",
            link: "https://reddit.com/r/bjj/comments/v5g9lj/anyone_here_who_has_recovered_fully_from_a/ib9o40h/",
            author: "wandererxox",
            subreddit: "bjj",
            postedAt: "Sun Jun 05 2022",
            threadTitle:
              "Anyone here who has recovered FULLY from a kneecap dislocation with just physical therapy and never had it happen again? IF YES, How?",
            keywords: ["scared"]
          },
          {
            comment:
              "It is helpful, but what I really want is a brackets feature that shows the bracket matches with times. \n\nAnd most of all, I’d love a “finals only” feature with the mat and time for each division so I can tune in for the finals.",
            link: "https://reddit.com/r/bjj/comments/v50ayp/for_every_ibjjf_comp_including_worlds_going_on_now/ib70na1/",
            author: "WriteOnceCutTwice",
            subreddit: "bjj",
            postedAt: "Sat Jun 04 2022",
            threadTitle: "For every IBJJF Comp, including Worlds going on now",
            keywords: ["love"]
          },
          {
            comment:
              "It is helpful, but what I really want is a brackets feature that shows the bracket matches with times. \n\nAnd most of all, I’d love a “finals only” feature with the mat and time for each division so I can tune in for the finals.\n\nUpdate: thanks for the comments, the bracket times are on their website but not an easy list of finals—unless I missed it",
            link: "https://reddit.com/r/bjj/comments/v50ayp/for_every_ibjjf_comp_including_worlds_going_on_now/ib70mje/",
            author: "WriteOnceCutTwice",
            subreddit: "bjj",
            postedAt: "Sat Jun 04 2022",
            threadTitle: "For every IBJJF Comp, including Worlds going on now",
            keywords: ["love"]
          },
          {
            comment:
              "WHICH MAT not only has awful UI, but it crashes almost every hour and clearly isn’t being run by a proper team.\n\nThe actual social media app for Jiu Jitsu, known as BJJLINK Social, has a much more modern, responsive, and accurately updated competition tracker for the major tournaments and soon local ones depending on which tournaments decide to pair with it.\n\nTLDR: WHICH MAT is boof, get BJJLINK Social",
            link: "https://reddit.com/r/bjj/comments/v50ayp/for_every_ibjjf_comp_including_worlds_going_on_now/ib72907/",
            author: "noahjitz",
            subreddit: "bjj",
            postedAt: "Sat Jun 04 2022",
            threadTitle: "For every IBJJF Comp, including Worlds going on now",
            keywords: ["awful"]
          },
          {
            comment: "Curious why?",
            link: "https://reddit.com/r/bjj/comments/v50ayp/for_every_ibjjf_comp_including_worlds_going_on_now/ib7i2i2/",
            author: "noahjitz",
            subreddit: "bjj",
            postedAt: "Sat Jun 04 2022",
            threadTitle: "For every IBJJF Comp, including Worlds going on now",
            keywords: ["Curious"]
          },
          {
            comment:
              "I consider myself a pressure passer. My whole goal is to get to top half guard and pass as slow and as tight as i can when i get top position. I mainly try to enter headquarters and start with a knee slice - if I get it- great. If I can't solidify half guard top, as my teamates know I go, I'll follow up with leg weaving passes to mount, or over/unders. \n\nI do like to torreando and x pass off headquarters as well. I'm always trying to pressure forward, but I have to be careful about running into loop chokes ang guillotines.  Add side to side pressure - knee slice and smash passing  on either side and then force half guard!",
            link: "https://reddit.com/r/bjj/comments/v5e8wb/pressure_passing/ib97x5c/",
            author: "Some_Dingo6046",
            subreddit: "bjj",
            postedAt: "Sun Jun 05 2022",
            threadTitle: "Pressure Passing",
            keywords: ["great"]
          },
          {
            comment:
              "Top half is my primary starting point. Priority 1 is getting a good pinch and control of their bottom leg, or else it controls you. If I can get it off the ground, even better. \n\nFrom there, head positioning is key to opening them up and not letting them curl up for deep half entries. For a quick pass, I go knee cut. To cook them, I love a reverse backstep style pass. \n\nThe benefits I've noticed of this pass is:\n\nIt divides their upper and lower halves, their arms aren't much threat and open your hands up to control the hip and work on opening the leg entanglement. \n\nIt's where I feel like I can add the most pressure (right on the diaphragm above the belt line, but not too high that their arms have any leverage). I try to keep at least one, but preferably both, of their feet off the ground so they can't bridge. Dilemma is...I want them to bridge, because they have to let go of my leg to do so, but I just want to know when that's going to be. So, I fight the legs with my free hand to force an opposite reaction (bridge), then backstep and walk hips to north/south control with heavy pressure.",
            link: "https://reddit.com/r/bjj/comments/v5e8wb/pressure_passing/ib9u0e5/",
            author: "Aaronjp84",
            subreddit: "bjj",
            postedAt: "Sun Jun 05 2022",
            threadTitle: "Pressure Passing",
            keywords: ["love"]
          },
          {
            comment:
              "He runs some scam TACTICAL DEFENSE shit now that's aimed at cops and military and people who like pretending they are either of those",
            link: "https://reddit.com/r/bjj/comments/v4ez8v/joe_rogan_rolling_footage_from_2009_remastered/ib42ydg/",
            author: "Quirky_Contract_7652",
            subreddit: "bjj",
            postedAt: "Fri Jun 03 2022",
            threadTitle: "Joe Rogan Rolling Footage From 2009 - Remastered",
            keywords: ["scam"]
          },
          {
            comment:
              "His stuff was not ok at all. He was awful and traveled around searching for someone to legitimize him. He found some random Pedro black belt in Idaho or somewhere in the middle of nowhere (a hike from Canada) to promote him a few time$  and give him legitimacy. Ari sucked.",
            link: "https://reddit.com/r/bjj/comments/v4ez8v/joe_rogan_rolling_footage_from_2009_remastered/ib4nbin/",
            author: "flowersweep",
            subreddit: "bjj",
            postedAt: "Sat Jun 04 2022",
            threadTitle: "Joe Rogan Rolling Footage From 2009 - Remastered",
            keywords: ["awful"]
          },
          {
            comment:
              "Seeing Ari Bolden gasping for air like a fish while Joe Rogan goes full dad on him is the best start to a morning I've had in a long time.",
            link: "https://reddit.com/r/bjj/comments/v4ez8v/joe_rogan_rolling_footage_from_2009_remastered/ib4t0zf/",
            author: "oncr",
            subreddit: "bjj",
            postedAt: "Sat Jun 04 2022",
            threadTitle: "Joe Rogan Rolling Footage From 2009 - Remastered",
            keywords: ["best"]
          },
          {
            comment:
              "Nowadays I salivate when I see someone wearing gi pants in no gi but it's cool to see things from back before I started. Great find.",
            link: "https://reddit.com/r/bjj/comments/v4ez8v/joe_rogan_rolling_footage_from_2009_remastered/ib46xx3/",
            author: "phe_nom",
            subreddit: "bjj",
            postedAt: "Fri Jun 03 2022",
            threadTitle: "Joe Rogan Rolling Footage From 2009 - Remastered",
            keywords: ["Great"]
          },
          {
            comment:
              "Well I was guessing back to pre 2010. Maybe pre 2008 is more accurate? My point was info vids breakdowns instructionals quality match coverage high speed mobile Internet streaming high quality vids cheap big data tariff etc maybe I'm a year or two out but if none of that sped up the learning of bjj and developed a higher understand across the broader community then I guess the garage days were best.",
            link: "https://reddit.com/r/bjj/comments/v4ez8v/joe_rogan_rolling_footage_from_2009_remastered/ib5d1l7/",
            author: "Incubus85",
            subreddit: "bjj",
            postedAt: "Sat Jun 04 2022",
            threadTitle: "Joe Rogan Rolling Footage From 2009 - Remastered",
            keywords: ["best"]
          },
          {
            comment:
              "No I get it, today is infinitely better with videos. I just remember when they started and it was incredible to be able to learn without being in class.",
            link: "https://reddit.com/r/bjj/comments/v4ez8v/joe_rogan_rolling_footage_from_2009_remastered/ib5fsas/",
            author: "Thugzz_Bunny",
            subreddit: "bjj",
            postedAt: "Sat Jun 04 2022",
            threadTitle: "Joe Rogan Rolling Footage From 2009 - Remastered",
            keywords: ["incredible"]
          },
          {
            comment:
              "That’s the excuse knee starters love to use, you are scared of take downs don’t lie to yourself",
            link: "https://reddit.com/r/bjj/comments/v4ez8v/joe_rogan_rolling_footage_from_2009_remastered/ib5g4et/",
            author: "seblang25",
            subreddit: "bjj",
            postedAt: "Sat Jun 04 2022",
            threadTitle: "Joe Rogan Rolling Footage From 2009 - Remastered",
            keywords: ["love", "scared"]
          },
          {
            comment:
              "I’ve been seeing videos of Daisy Fresh throughout the Covid lockdown. They were portrayed as full time BJJers that train hard and one of the best teams in the US. Where are they at Worlds? Is everyone injured?",
            link: "https://www.reddit.com/r/bjj/comments/v54tb2/where_is_pedigo_submission_fightingdaisy_fresh_at/",
            author: "Spiderman228",
            subreddit: "bjj",
            postedAt: "Sat Jun 04 2022",
            threadTitle:
              "Where is Pedigo Submission Fighting(Daisy Fresh) at Worlds ?",
            keywords: ["best"]
          },
          {
            comment:
              "We've rolled tons of times.  I fucking love dante. He doesn't mind scrapping when it's time to scrap, but he also knows how to ease off and train smart.",
            link: "https://reddit.com/r/bjj/comments/v54tb2/where_is_pedigo_submission_fightingdaisy_fresh_at/ib9r2qz/",
            author: "december6",
            subreddit: "bjj",
            postedAt: "Sun Jun 05 2022",
            threadTitle:
              "Where is Pedigo Submission Fighting(Daisy Fresh) at Worlds ?",
            keywords: ["love"]
          },
          {
            comment:
              "I can’t think of a more overhyped team. Some teams had a splash and fell off later but DF was/is being called one of the best teams with no BB World champions. Other than Wiltse, who  won Purple or Brown Belt Worlds or Pans from there?",
            link: "https://reddit.com/r/bjj/comments/v54tb2/where_is_pedigo_submission_fightingdaisy_fresh_at/ib9a1ib/",
            author: "Spiderman228",
            subreddit: "bjj",
            postedAt: "Sun Jun 05 2022",
            threadTitle:
              "Where is Pedigo Submission Fighting(Daisy Fresh) at Worlds ?",
            keywords: ["best"]
          },
          {
            comment:
              "Right. I think it has to do with a cool story, couple of charismatic ish characters, and the fact that they were pushed by one of the only BJJ media channels. \n\nWorth keeping an eye on? Sure. But they haven't demonstrated strength in depth or over time at the highest level.\n\nObviously a decent gym to though.",
            link: "https://reddit.com/r/bjj/comments/v54tb2/where_is_pedigo_submission_fightingdaisy_fresh_at/ib9azre/",
            author: "Perfect_Journalist61",
            subreddit: "bjj",
            postedAt: "Sun Jun 05 2022",
            threadTitle:
              "Where is Pedigo Submission Fighting(Daisy Fresh) at Worlds ?",
            keywords: ["Worth"]
          },
          {
            comment:
              "My team hasn't let me teach them much. We're fixing this. We have a new building, new class schedules , new equipment, new mindset. The next few years are going to be much more interesting. \n\nAlso I won black belt no gi pans and got second on the next run  while being completely clinically dissociated. Worth a mention I think.\n\nAlso we've won plenty of majors now as a team. That's not something you can sweep under the rug.",
            link: "https://reddit.com/r/bjj/comments/v54tb2/where_is_pedigo_submission_fightingdaisy_fresh_at/ib9h5uz/",
            author: "december6",
            subreddit: "bjj",
            postedAt: "Sun Jun 05 2022",
            threadTitle:
              "Where is Pedigo Submission Fighting(Daisy Fresh) at Worlds ?",
            keywords: ["Worth"]
          },
          {
            comment:
              "Tammi and mikey were literally the best in the world before joining. Anything they win from this point on still reflects their own training only, nothing to do with Daisy Fresh. Mikey and Tammy are DF but they're doing their own thing and they'll visit to train. Or they change their minds and move. Who knows lol. They rock either way",
            link: "https://reddit.com/r/bjj/comments/v54tb2/where_is_pedigo_submission_fightingdaisy_fresh_at/ib9ik1n/",
            author: "december6",
            subreddit: "bjj",
            postedAt: "Sun Jun 05 2022",
            threadTitle:
              "Where is Pedigo Submission Fighting(Daisy Fresh) at Worlds ?",
            keywords: ["best"]
          },
          {
            comment:
              "Andrew is one of the best ever, but he's focused on no-gi. That's why he won the ADCC trials and coming for that gold in the fall",
            link: "https://reddit.com/r/bjj/comments/v54tb2/where_is_pedigo_submission_fightingdaisy_fresh_at/ib8uq4b/",
            author: "DogBoxing",
            subreddit: "bjj",
            postedAt: "Sun Jun 05 2022",
            threadTitle:
              "Where is Pedigo Submission Fighting(Daisy Fresh) at Worlds ?",
            keywords: ["best"]
          },
          {
            comment:
              "He can be great but idk if I’d call him one of the best ever yet.",
            link: "https://reddit.com/r/bjj/comments/v54tb2/where_is_pedigo_submission_fightingdaisy_fresh_at/ib8wkyt/",
            author: "teethteetheat",
            subreddit: "bjj",
            postedAt: "Sun Jun 05 2022",
            threadTitle:
              "Where is Pedigo Submission Fighting(Daisy Fresh) at Worlds ?",
            keywords: ["great", "best"]
          },
          {
            comment:
              "I don’t doubt it my man, can’t wait to see you compete again. Would love to see you up against Tommy Langkaker someday.",
            link: "https://reddit.com/r/bjj/comments/v54tb2/where_is_pedigo_submission_fightingdaisy_fresh_at/ib9jqfq/",
            author: "teethteetheat",
            subreddit: "bjj",
            postedAt: "Sun Jun 05 2022",
            threadTitle:
              "Where is Pedigo Submission Fighting(Daisy Fresh) at Worlds ?",
            keywords: ["love"]
          },
          {
            comment:
              "You gotta go full galaxy brain, all the teams merge and everyone is affiliated with each other.  Therefore there's no need for anyone to compete since everyone in the gym knows who's best!  So we just shut down tournaments entirely.",
            link: "https://reddit.com/r/bjj/comments/v4on9n/cole_abate_and_gustavo_ogawa_both_have_world/ib65doi/",
            author: "ryanrockmoran",
            subreddit: "bjj",
            postedAt: "Sat Jun 04 2022",
            threadTitle:
              "Cole Abate and Gustavo Ogawa both have “world champion” posts on their Instagram, when will the close outs end?",
            keywords: ["best"]
          },
          {
            comment:
              "Ah yes, a sport with millions of dollars on the line and minimal risk of injury vs a sport with 0 dollars on the line and huge risk of injury. Great comparison.",
            link: "https://reddit.com/r/bjj/comments/v4on9n/cole_abate_and_gustavo_ogawa_both_have_world/ib7vzow/",
            author: "NerfMcCreee",
            subreddit: "bjj",
            postedAt: "Sat Jun 04 2022",
            threadTitle:
              "Cole Abate and Gustavo Ogawa both have “world champion” posts on their Instagram, when will the close outs end?",
            keywords: ["Great"]
          },
          {
            comment:
              "Fuck the spectators lmao. Cole and Gustavo (and every single other competitor) pay thousands of dollars on a flight/hotel/food/registration fees to fight. How much do you pay the competitors to fight? Oh yeah. Nothing. You deserve nothing as a spectator from anyone. You want two guys who are best friends, or in some cases even brothers, to risk injury fighting each other because you think you, who contribute nothing, deserve to see it? Maybe if the IBJJF paid competitors or waived registration fees, this would make sense. But there is literally 0 incentive nor reason for teammates to fight for the “spectators”",
            link: "https://reddit.com/r/bjj/comments/v4on9n/cole_abate_and_gustavo_ogawa_both_have_world/ib7vm0s/",
            author: "NerfMcCreee",
            subreddit: "bjj",
            postedAt: "Sat Jun 04 2022",
            threadTitle:
              "Cole Abate and Gustavo Ogawa both have “world champion” posts on their Instagram, when will the close outs end?",
            keywords: ["best"]
          },
          {
            comment:
              "I mean... yes?  The whole point of having these tournaments is to figure out who's the best on that day in that weight.  If it doesn't matter who's better, why are we having tournaments at all?",
            link: "https://reddit.com/r/bjj/comments/v4on9n/cole_abate_and_gustavo_ogawa_both_have_world/ib5x62b/",
            author: "ryanrockmoran",
            subreddit: "bjj",
            postedAt: "Sat Jun 04 2022",
            threadTitle:
              "Cole Abate and Gustavo Ogawa both have “world champion” posts on their Instagram, when will the close outs end?",
            keywords: ["best"]
          },
          {
            comment:
              "It’s a sport. You prove who is the best until the very end. Hand shaking and forfeiting is not a sport.",
            link: "https://reddit.com/r/bjj/comments/v4on9n/cole_abate_and_gustavo_ogawa_both_have_world/ib84fiz/",
            author: "bnelson",
            subreddit: "bjj",
            postedAt: "Sat Jun 04 2022",
            threadTitle:
              "Cole Abate and Gustavo Ogawa both have “world champion” posts on their Instagram, when will the close outs end?",
            keywords: ["best"]
          },
          {
            comment:
              "People have their own reasons. It seems weird to get so upset at other people deciding what is best for themselves.",
            link: "https://reddit.com/r/bjj/comments/v4on9n/cole_abate_and_gustavo_ogawa_both_have_world/ib6ux6j/",
            author: "ilikebikes_n_stuff",
            subreddit: "bjj",
            postedAt: "Sat Jun 04 2022",
            threadTitle:
              "Cole Abate and Gustavo Ogawa both have “world champion” posts on their Instagram, when will the close outs end?",
            keywords: ["best"]
          },
          {
            comment:
              "You win. You clearly know how to do things. We should listen to you always and forever because you clearly are not a baby and have the answers to solve the great problems plaguing jiu jitsu.",
            link: "https://reddit.com/r/bjj/comments/v4on9n/cole_abate_and_gustavo_ogawa_both_have_world/ib6kd68/",
            author: "ilikebikes_n_stuff",
            subreddit: "bjj",
            postedAt: "Sat Jun 04 2022",
            threadTitle:
              "Cole Abate and Gustavo Ogawa both have “world champion” posts on their Instagram, when will the close outs end?",
            keywords: ["great"]
          },
          {
            comment:
              "When you get to the finals of worlds with your teammates then you can be the beacon of light we all look to for inspiration. It will be a great day for us all.",
            link: "https://reddit.com/r/bjj/comments/v4on9n/cole_abate_and_gustavo_ogawa_both_have_world/ib6kih5/",
            author: "ilikebikes_n_stuff",
            subreddit: "bjj",
            postedAt: "Sat Jun 04 2022",
            threadTitle:
              "Cole Abate and Gustavo Ogawa both have “world champion” posts on their Instagram, when will the close outs end?",
            keywords: ["great"]
          },
          {
            comment:
              "“I, a casual who contributes nothing to the sport nor nothing to the livelihoods of the professional athletes who risk great injury for basically nothing in reward, believe I should be in charge of the rules regarding how who should fight who.” Shut up dude lol. Spectators deserve absolutely nothing. If my friend and I pay the registration fee, and get $0 to win, we don’t owe you shit. Grow up.",
            link: "https://reddit.com/r/bjj/comments/v4on9n/cole_abate_and_gustavo_ogawa_both_have_world/ib7vudo/",
            author: "NerfMcCreee",
            subreddit: "bjj",
            postedAt: "Sat Jun 04 2022",
            threadTitle:
              "Cole Abate and Gustavo Ogawa both have “world champion” posts on their Instagram, when will the close outs end?",
            keywords: ["great"]
          },
          {
            comment: "(Flying) knee shield the best counter.",
            link: "https://reddit.com/r/bjj/comments/v4agxb/jesus_christ_lol/ib3y8mg/",
            author: "Steko",
            subreddit: "bjj",
            postedAt: "Fri Jun 03 2022",
            threadTitle: "Jesus Christ Lol",
            keywords: ["best"]
          },
          {
            comment: "Yeah. Amazing. Just kneel and watch them crumble.",
            link: "https://reddit.com/r/bjj/comments/v4agxb/jesus_christ_lol/ib3zifn/",
            author: "aliasname",
            subreddit: "bjj",
            postedAt: "Fri Jun 03 2022",
            threadTitle: "Jesus Christ Lol",
            keywords: ["Amazing"]
          },
          {
            comment: "At :36 would be amazing to see a Boston Crab",
            link: "https://reddit.com/r/bjj/comments/v4agxb/jesus_christ_lol/ib3o4vr/",
            author: "ImTryingMaaaaan",
            subreddit: "bjj",
            postedAt: "Fri Jun 03 2022",
            threadTitle: "Jesus Christ Lol",
            keywords: ["amazing"]
          },
          {
            comment:
              "How are Flo better at taking down little videos like this than the UFC are at getting their stuff down? God I hate Flo.",
            link: "https://reddit.com/r/bjj/comments/v4agxb/jesus_christ_lol/ib4dkf4/",
            author: "ZampanoBJJ",
            subreddit: "bjj",
            postedAt: "Fri Jun 03 2022",
            threadTitle: "Jesus Christ Lol",
            keywords: ["hate"]
          },
          {
            comment:
              "For what purpose? To get guard? Is that really the best way to make sure you get it?",
            link: "https://reddit.com/r/bjj/comments/v4agxb/jesus_christ_lol/ib36s50/",
            author: "WillShitpostForFood",
            subreddit: "bjj",
            postedAt: "Fri Jun 03 2022",
            threadTitle: "Jesus Christ Lol",
            keywords: ["best"]
          },
          {
            comment:
              "As a person in the lighter weight classes, I hate this. I want to wrestle, dammit. My last tournament opponent had me mentally broken because he kept pulling guard",
            link: "https://reddit.com/r/bjj/comments/v4agxb/jesus_christ_lol/ib6m0qn/",
            author: "qb1120",
            subreddit: "bjj",
            postedAt: "Sat Jun 04 2022",
            threadTitle: "Jesus Christ Lol",
            keywords: ["hate"]
          },
          {
            comment:
              "I agree, I hate it too. I prefer to play on top, so I have to train wrestling for that rare opponent that doesn't pull guard and tbh I think wrestling is pretty fun now that I've been working on it recently. But, then it's so frustrating that I don't even get to use the wrestling I'm putting all this time into in 9/10 matches. I know some of it still helps with things like base, hand fighting and wrestle ups. But, sometimes I just want to hit the shots I spent hours drilling.\n\nOne thing has helped me is to drill my wrestling with the goal of also blocking the jump guard or closed guard pull (this is pretty easy to do with the right stance). That way, if my opponent does pull guard, they're probably just pulling that weak seated guard. I practiced entering and passing that guard a ton, so when my opponent pulls it, they're still giving me a good position that I know how to pass from.",
            link: "https://reddit.com/r/bjj/comments/v4agxb/jesus_christ_lol/ib6n8xv/",
            author: "gilatio",
            subreddit: "bjj",
            postedAt: "Sat Jun 04 2022",
            threadTitle: "Jesus Christ Lol",
            keywords: ["hate"]
          },
          {
            comment:
              "  You must be young and still think you’re bullet proof. Us old guys need to have healthy(ish) knees so we can provide for ourselves and our  family. Some pot metal award is not worth a debilitating injury That will likely linger to some extent for the rest of our life. Hard pass.",
            link: "https://reddit.com/r/bjj/comments/v4agxb/jesus_christ_lol/ib3w649/",
            author: "Fabio421",
            subreddit: "bjj",
            postedAt: "Fri Jun 03 2022",
            threadTitle: "Jesus Christ Lol",
            keywords: ["worth"]
          },
          {
            comment:
              "I've never completed and am pretty new. Why the hardcore hate for the flying guard pull? Risk of injury to opponent? I thought flying armbar and the like were standard.",
            link: "https://reddit.com/r/bjj/comments/v4agxb/jesus_christ_lol/ib3u3vo/",
            author: "JackZodiac2008",
            subreddit: "bjj",
            postedAt: "Fri Jun 03 2022",
            threadTitle: "Jesus Christ Lol",
            keywords: ["hate"]
          },
          {
            comment:
              "Holy fuck, I hate guard pulling. It’s actually a BJJ joke that non practitioners know.",
            link: "https://reddit.com/r/bjj/comments/v4agxb/jesus_christ_lol/ib3vif0/",
            author: "FreshCrown",
            subreddit: "bjj",
            postedAt: "Fri Jun 03 2022",
            threadTitle: "Jesus Christ Lol",
            keywords: ["hate"]
          },
          {
            comment:
              "I was kinda impressed. I like this kid. This kid gonna  take the rules to the limit. I love me some cheap not quite dirty wins.",
            link: "https://reddit.com/r/bjj/comments/v4agxb/jesus_christ_lol/ib469lq/",
            author: "LeftJoin79",
            subreddit: "bjj",
            postedAt: "Fri Jun 03 2022",
            threadTitle: "Jesus Christ Lol",
            keywords: ["love"]
          },
          {
            comment:
              "Title pretty much says it.. whenever I compete I always do GI and no GI… as of late I’ve been interested in attending this new 10th Planet Gym that just opened a few months in Florida and was just curious if you guys just forgo all GI competing all together",
            link: "https://www.reddit.com/r/bjj/comments/v511uu/10th_planet_goers_do_you_compete_in_gi_at_all_or/",
            author: "YouveGotMail236",
            subreddit: "bjj",
            postedAt: "Sat Jun 04 2022",
            threadTitle:
              "10th Planet Goers- Do you compete in GI at all or skip it all together?",
            keywords: ["curious"]
          },
          {
            comment:
              "At pompano beach?  If so. Coach is Matt Walsh I have a few years on him but we came up together in SF.  Matt will train gi with ya if you ask.  I do for now and then but rather do judo at that point\n\nMatt has great Jiu jitsu. Check it out",
            link: "https://reddit.com/r/bjj/comments/v511uu/10th_planet_goers_do_you_compete_in_gi_at_all_or/ib78syi/",
            author: "qtipinspector",
            subreddit: "bjj",
            postedAt: "Sat Jun 04 2022",
            threadTitle:
              "10th Planet Goers- Do you compete in GI at all or skip it all together?",
            keywords: ["great"]
          },
          {
            comment:
              "Why ignore 100% of BJJ, when you can ignore 100% of BJJ :P\n\n&amp;#x200B;\n\n(I'm just kidding- I love gi and no gi- and feel like you should train in whatever you like)",
            link: "https://reddit.com/r/bjj/comments/v511uu/10th_planet_goers_do_you_compete_in_gi_at_all_or/ib750zm/",
            author: "konying418",
            subreddit: "bjj",
            postedAt: "Sat Jun 04 2022",
            threadTitle:
              "10th Planet Goers- Do you compete in GI at all or skip it all together?",
            keywords: ["love"]
          },
          {
            comment:
              "10th planet St. Pete? If so definitely come through. Pete is a great coach and the facility is awesome!",
            link: "https://reddit.com/r/bjj/comments/v511uu/10th_planet_goers_do_you_compete_in_gi_at_all_or/ib7b5lm/",
            author: "RaulFreshh",
            subreddit: "bjj",
            postedAt: "Sat Jun 04 2022",
            threadTitle:
              "10th Planet Goers- Do you compete in GI at all or skip it all together?",
            keywords: ["great"]
          },
          {
            comment:
              "Hey so yeah they have ranked rashies that you have to wear. Sunday open mat you can wear whatever you want. I was little turned off by it as well as first but it wasn’t a hill to die on for me, even though I had a nice collection of rash guards. The ranked ones are REALLY good quality though.\n\nFor some perspective, when I moved to St. Pete in September I was training at Inside Control Academy which is another no gi/mma gym and that gym was really dirty, and the culture there was really just bros in gym shorts and t shirts lol.  So I bit the bullet and joined even though I didn’t want to buy 3 new rash guards. \n\nBUT I’m so happy I jumped ship. The facility is really nice, CLEAN, and spacious. Pete the owner/coach is great and I have been learning a ton in my couple months there. Blue belt with 3 years experience for reference.",
            link: "https://reddit.com/r/bjj/comments/v511uu/10th_planet_goers_do_you_compete_in_gi_at_all_or/ib7nohp/",
            author: "RaulFreshh",
            subreddit: "bjj",
            postedAt: "Sat Jun 04 2022",
            threadTitle:
              "10th Planet Goers- Do you compete in GI at all or skip it all together?",
            keywords: ["great"]
          },
          {
            comment:
              "Hey thank you for the great response. That's really helpful. \n\nI'm trying to decide on Tampa or Miami, and if I end up in Tampa I will definitely drop in.",
            link: "https://reddit.com/r/bjj/comments/v511uu/10th_planet_goers_do_you_compete_in_gi_at_all_or/ib7plg3/",
            author: "YesButConsiderThis",
            subreddit: "bjj",
            postedAt: "Sat Jun 04 2022",
            threadTitle:
              "10th Planet Goers- Do you compete in GI at all or skip it all together?",
            keywords: ["great"]
          },
          {
            comment: "Hell yeah brother best of luck in your travels !",
            link: "https://reddit.com/r/bjj/comments/v511uu/10th_planet_goers_do_you_compete_in_gi_at_all_or/ib7uzbr/",
            author: "RaulFreshh",
            subreddit: "bjj",
            postedAt: "Sat Jun 04 2022",
            threadTitle:
              "10th Planet Goers- Do you compete in GI at all or skip it all together?",
            keywords: ["best"]
          },
          {
            comment:
              "During quarantine I did what Glover did. He went to the hardware store and bought a roll of carpet underlayment. Then out of the whole roll he cut it and stacked it 3 thicknesses tall. Then he bought a tarp and stretched it over top. Worked great for what it was and cheap for a big area",
            link: "https://reddit.com/r/bjj/comments/v52sy8/at_home_mats_on_a_budget/ib7idyq/",
            author: "DIAMONDxWHALE",
            subreddit: "bjj",
            postedAt: "Sat Jun 04 2022",
            threadTitle: "At home mats on a budget?",
            keywords: ["great"]
          },
          {
            comment:
              "I have these mats from a different company and it's definitely a great bang for the buck.",
            link: "https://reddit.com/r/bjj/comments/v52sy8/at_home_mats_on_a_budget/ib8ezcl/",
            author: "tea_bjj",
            subreddit: "bjj",
            postedAt: "Sun Jun 05 2022",
            threadTitle: "At home mats on a budget?",
            keywords: ["great"]
          },
          {
            comment:
              "Like a “flow roll” with someone but at 90%. Each person gaining great positions/counters but no submissions end up landing",
            link: "https://reddit.com/r/bjj/comments/v523zd/what_does_it_mean_to_have_a_good_roll_to_you/ib7io1a/",
            author: "DIAMONDxWHALE",
            subreddit: "bjj",
            postedAt: "Sat Jun 04 2022",
            threadTitle: 'What does it mean to have a "good roll" to you?',
            keywords: ["great"]
          },
          {
            comment:
              "Unverified black belt here.   I want to see multiple positions and work through them.  I do not try to submit anyone until the end of the round and sometimes I never even try.  I want to see what other people are good at and what they do that feels effective and I love when my partner and I can get creative and find novel solutions to positions and the problem they present.  \n\nI regularly will let lower belts tap me if they do well just to reset and work through the spot again.",
            link: "https://reddit.com/r/bjj/comments/v523zd/what_does_it_mean_to_have_a_good_roll_to_you/ib7hlf5/",
            author: "The_ducci",
            subreddit: "bjj",
            postedAt: "Sat Jun 04 2022",
            threadTitle: 'What does it mean to have a "good roll" to you?',
            keywords: ["love"]
          },
          {
            comment:
              "One that's challenging enough I have to perform well, but not so challenging I can't work. Thankfully I've got some cool training partners that can get me right to that point. Then we sit afterwards and talk about particular spots. That's a great roll.",
            link: "https://reddit.com/r/bjj/comments/v523zd/what_does_it_mean_to_have_a_good_roll_to_you/ib9lqxo/",
            author: "beetle-eetle",
            subreddit: "bjj",
            postedAt: "Sun Jun 05 2022",
            threadTitle: 'What does it mean to have a "good roll" to you?',
            keywords: ["great"]
          },
          {
            comment:
              "Open Class was amazing, also enjoying the stream on Flo so far. Few boring matches, but Hookage vs Nagai was entertaining as fuck.\n\n&amp;#x200B;\n\nWaiting now for Tainan..",
            link: "https://reddit.com/r/bjj/comments/v4qyqo/ibjjf_world_championship_thread/ib6yam4/",
            author: "Leagis",
            subreddit: "bjj",
            postedAt: "Sat Jun 04 2022",
            threadTitle: "IBJJF World Championship Thread",
            keywords: ["amazing"]
          },
          {
            comment:
              "Both are great, but nogi is just more technical and more entertaining",
            link: "https://reddit.com/r/bjj/comments/v4qyqo/ibjjf_world_championship_thread/ib7geov/",
            author: "sire_alston",
            subreddit: "bjj",
            postedAt: "Sat Jun 04 2022",
            threadTitle: "IBJJF World Championship Thread",
            keywords: ["great"]
          },
          {
            comment:
              "Xande looking past his prime for sure, love the guy though",
            link: "https://reddit.com/r/bjj/comments/v4qyqo/ibjjf_world_championship_thread/ib755xp/",
            author: "Avid23",
            subreddit: "bjj",
            postedAt: "Sat Jun 04 2022",
            threadTitle: "IBJJF World Championship Thread",
            keywords: ["love"]
          },
          {
            comment:
              "Love to check the score while meregali has direct, unfettered access to my neck and a cross collar grip",
            link: "https://reddit.com/r/bjj/comments/v4qyqo/ibjjf_world_championship_thread/ib6b0eu/",
            author: "invrsleep",
            subreddit: "bjj",
            postedAt: "Sat Jun 04 2022",
            threadTitle: "IBJJF World Championship Thread",
            keywords: ["Love"]
          },
          {
            comment:
              "Oh wow I did not realize he was 41 I thought he was still in his 30s. \n\nAbsolutely won’t take anything away from his legacy. Love the guy too and everything he has done for jiu jitsu",
            link: "https://reddit.com/r/bjj/comments/v4qyqo/ibjjf_world_championship_thread/ib75z6u/",
            author: "Avid23",
            subreddit: "bjj",
            postedAt: "Sat Jun 04 2022",
            threadTitle: "IBJJF World Championship Thread",
            keywords: ["Love"]
          },
          {
            comment:
              "41 still competing in the adult black belt division. That by itself is incredible.",
            link: "https://reddit.com/r/bjj/comments/v4qyqo/ibjjf_world_championship_thread/ib76p5y/",
            author: "JiuJitsuMagic",
            subreddit: "bjj",
            postedAt: "Sat Jun 04 2022",
            threadTitle: "IBJJF World Championship Thread",
            keywords: ["incredible"]
          },
          {
            comment:
              "I have mixed feelings about gi competitions.\n\nThere's a lot of athletes that I love to watch, but then there's always one fuck who's like \"shit I can't beat this guy, imma stall the whole match and throw a hail mary to win\" which sucks for us watching at home",
            link: "https://reddit.com/r/bjj/comments/v4qyqo/ibjjf_world_championship_thread/ib5jq02/",
            author: "RingWormGuard",
            subreddit: "bjj",
            postedAt: "Sat Jun 04 2022",
            threadTitle: "IBJJF World Championship Thread",
            keywords: ["love"]
          },
          {
            comment:
              "Wrestling is boring to watch, so boring it was almost removed from the Olympics. Also curling is an Olympic sport.\n\nBJJ competitions are not meant to be entertaining, they are meant to know who's the best in this ruleset.\n\nI like watching some BJJ.",
            link: "https://reddit.com/r/bjj/comments/v4qyqo/ibjjf_world_championship_thread/ib8mbrm/",
            author: "Gchiki",
            subreddit: "bjj",
            postedAt: "Sun Jun 05 2022",
            threadTitle: "IBJJF World Championship Thread",
            keywords: ["best"]
          },
          {
            comment: "Agreed! It would be great to see more events like that!",
            link: "https://reddit.com/r/bjj/comments/v4qyqo/ibjjf_world_championship_thread/ib8n3s2/",
            author: "smalltowngrappler",
            subreddit: "bjj",
            postedAt: "Sun Jun 05 2022",
            threadTitle: "IBJJF World Championship Thread",
            keywords: ["great"]
          },
          {
            comment:
              "GI is great. Harder to be entertaining since grips can slow it down, but IMO it’s much funnier to play.",
            link: "https://reddit.com/r/bjj/comments/v4qyqo/ibjjf_world_championship_thread/ib6nrfs/",
            author: "Avid23",
            subreddit: "bjj",
            postedAt: "Sat Jun 04 2022",
            threadTitle: "IBJJF World Championship Thread",
            keywords: ["great"]
          },
          {
            comment:
              "If you have massive quads and a big choad they will look fantastic!",
            link: "https://reddit.com/r/bjj/comments/v53wc9/vale_turo_shorts_weird/ib8vd8j/",
            author: "Vivasanti",
            subreddit: "bjj",
            postedAt: "Sun Jun 05 2022",
            threadTitle: "Vale Turo shorts weird?",
            keywords: ["fantastic"]
          },
          {
            comment:
              "&gt;Has the community just abandoned the gi completely?\n\nThe vast majority claim to love and prefer gi, but even when there are big comps, \\*crickets\\*. With the amount of competitors, categories, and sheer matches, there must be enough jiu jitsu at worlds to have conversation for a whole year, but aside from funny moments, questionable judge calls, and the few big name match-ups, there's really nothing being discussed",
            link: "https://reddit.com/r/bjj/comments/v57xe7/no_tread_for_worlds/ib8lz1n/",
            author: "Impressive_Gap5464",
            subreddit: "bjj",
            postedAt: "Sun Jun 05 2022",
            threadTitle: "No tread for world's?",
            keywords: ["love"]
          },
          {
            comment:
              "I love training in the gi, and have just over the last year started getting into watching competitions, but here there are almost nothing except memes.",
            link: "https://reddit.com/r/bjj/comments/v57xe7/no_tread_for_worlds/ib8tuyh/",
            author: "Advantagefighter",
            subreddit: "bjj",
            postedAt: "Sun Jun 05 2022",
            threadTitle: "No tread for world's?",
            keywords: ["love"]
          },
          {
            comment:
              "It seems the community here is dying off, which is sad. I also think the hate towards, and the horrible product from Flo is doing its part.",
            link: "https://reddit.com/r/bjj/comments/v57xe7/no_tread_for_worlds/ib9omwu/",
            author: "Advantagefighter",
            subreddit: "bjj",
            postedAt: "Sun Jun 05 2022",
            threadTitle: "No tread for world's?",
            keywords: ["hate"]
          },
          {
            comment:
              "Normally love worlds. Saw so many weird calls yesterday just felt bummed out after watching.",
            link: "https://reddit.com/r/bjj/comments/v57xe7/no_tread_for_worlds/ib8mez9/",
            author: "Apprehensive_Sea4115",
            subreddit: "bjj",
            postedAt: "Sun Jun 05 2022",
            threadTitle: "No tread for world's?",
            keywords: ["love"]
          }
        ]
      };
      setSearchData(response.data.slice(0, 1));
    } catch (error) {
      console.error(error);
    } finally {
      setIsSearching(false);
    }
  }

  return (
    <Layout>
      <Wrapper>
        {isSearching && <Loading />}

        {!isSearching && !searchData && (
          <SearchWrapper>
            <SearchBar
              label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <SubredditInput
              label="Subreddits"
              value={subreddits}
              onChange={(e) => setSubreddits(e.target.value)}
            />
            <UrlsInput
              label="URLs"
              value={urls}
              onChange={(e) => setUrls(e.target.value)}
            />
            <KeywordsInput
              label="Keywords"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />

            <SearchButton onClick={async () => await search()}>
              Search
            </SearchButton>
          </SearchWrapper>
        )}

        {!isSearching && searchData && (
          <DataWrapper>
            <ResetSearchWrapper>
              <ResetSearch
                onClick={() => {
                  setSearchData(null);
                }}
              >
                Reset Search
              </ResetSearch>
            </ResetSearchWrapper>
            {searchData.map((data, index) => {
              return (
                <CommentCard
                  data={data}
                  key={index}
                  name={index}
                  projectId={id}
                  projectTags={project.tags}
                />
              );
            })}
          </DataWrapper>
        )}
      </Wrapper>
    </Layout>
  );
};

const Wrapper = styled.div`
  min-height: 100%;
  margin-bottom: 250px;
`;

const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const SearchBar = styled(SearchInput)`
  width: 638px;
  height: 44px;
  border-radius: 3px;
  border: 2px solid var(--color-white);
`;

const SubredditInput = styled(TextInput)``;

const KeywordsInput = styled(TextInput)``;

const UrlsInput = styled(TextInput)``;

const SearchButton = styled(UnstyledButton)`
  border: 2px solid var(--color-yellow-500);
  margin-top: 24px;
  padding: 16px;
  color: var(--color-white);
  text-align: center;
  font-size: 1.5rem;

  &:hover {
    background: var(--color-yellow-500);
    color: black;
  }
`;

const DataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 72px;
  max-width: 800px;
  isolation: isolate;
`;
const ResetSearchWrapper = styled.div`
  z-index: 1;
  position: sticky;
  top: 0;
  height: 100px;
  width: 100%;
  background: var(--color-background);
  display: flex;
  align-items: center;
`;
const ResetSearch = styled(UnstyledButton)`
  font-size: 1.5rem;
  text-decoration: none;
`;

export default MRT;
