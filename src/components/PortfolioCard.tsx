import S from './PortfolioCard.module.css'
import bookmarkIcon from '../assets/icon/bookmark-empty.svg'
import bookmarkFilledIcon from '../assets/icon/bookmark-fill.svg'
import grayHeart from '../assets/icon/grayHeart.svg'
import eye from '../assets/icon/eye.svg'
import { useState } from 'react'
import supabase from '@/lib/supabaseClient'

export interface Props {
  id: string
  userid: number
  title: string
  content: string
  likecount: number
  viewcount: number
  interest: string
  career: string
}

export function PortfolioCard({
  id,
  userid,
  title,
  content,
  likecount,
  viewcount,
  interest,
  career
}: Props) {
  const [bookmarked, setBookmarked] = useState(false);

  const toggleBookmark = async () => {
    setBookmarked(!bookmarked);

    const user = await supabase.auth.getUser();
    const userId = user.data.user?.id;

    if (!userId) return;

    if (!bookmarked) {
      await supabase.from('BookMark').insert({
        userid: userId,
        portfolioid: id
      });
    } else {
      await supabase
        .from('BookMark')
        .delete()
        .eq('userid', userId)
        .eq('portfolioid', id);
    }
  };

  return (
    <div className={S.container}>
      <div className={S.interest}>{interest}</div>
      <button onClick={toggleBookmark} className={S.bookmark}>
        <img
          src={bookmarked ? bookmarkFilledIcon : bookmarkIcon}
          alt="bookmark icon"
        />
      </button>

      <span className={S.career}> {career} </span>
      <h3 className={S.title}>{title}</h3>
      <span className={S.content}>{content}</span>

      <div className={S.meta}>
        <span className={S.like}>
          <img src={grayHeart} alt="Like Icon" />
          {likecount}
        </span>
        <span className={S.view}>
          <img src={eye} alt="View Icon" />
          {viewcount}
        </span>
      </div>
    </div>
  );
}
