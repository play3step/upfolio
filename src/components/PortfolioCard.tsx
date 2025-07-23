import S from './PortfolioCard.module.css'

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
  title,
  content,
  likecount,
  viewcount,
  interest,
  career
}: Props) {
  return (
    <div className={S.container}>
      <div className={S.interest}>{interest}</div>
      <button className={S.bookmark}>
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6 13.5C6 9.25736 6 7.13604 7.31802 5.81802C8.63604 4.5 10.7574 4.5 15 4.5H21C25.2426 4.5 27.364 4.5 28.682 5.81802C30 7.13604 30 9.25736 30 13.5V23.7414C30 27.7663 30 29.7788 28.7336 30.3943C27.4671 31.0099 25.8847 29.7665 22.7198 27.2798L21.7069 26.484C19.9274 25.0858 19.0376 24.3867 18 24.3867C16.9624 24.3867 16.0726 25.0858 14.2931 26.484L13.2802 27.2798C10.1153 29.7665 8.53288 31.0099 7.26644 30.3943C6 29.7788 6 27.7663 6 23.7414V13.5Z"
            stroke="#355749"
            stroke-width="2"
          />
        </svg>
      </button>

      <span className={S.career}> {career} </span>
      <h3 className={S.title}>{title}</h3>
      <span className={S.content}> {content}</span>
      <div className={S.meta}>
        <span className={S.like}>
          <svg
            width="16"
            height="14"
            viewBox="0 0 16 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M2.96696 7.77198L7.60203 12.1261C7.65387 12.1748 7.67979 12.1992 7.70447 12.2173C7.88034 12.346 8.11934 12.346 8.2952 12.2173C8.31988 12.1992 8.3458 12.1748 8.39765 12.1261L13.0327 7.77198C14.3368 6.5469 14.4952 4.5309 13.3984 3.11722L13.1921 2.8514C11.88 1.16022 9.24626 1.44385 8.32428 3.3756C8.19405 3.64848 7.80563 3.64848 7.67539 3.3756C6.75342 1.44385 4.11965 1.16022 2.80753 2.8514L2.6013 3.11722C1.50447 4.5309 1.66284 6.5469 2.96696 7.77198Z"
              fill="#757575"
              stroke="#757575"
              strokeWidth="2"
            />
          </svg>
          {likecount}
        </span>
        <span className={S.view}>
          <svg
            width="14"
            height="11"
            viewBox="0 0 14 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7.00034 0.833008C9.7651 0.833194 11.594 2.47153 12.6253 3.80664C13.1052 4.42789 13.3453 4.7393 13.3285 5.44824C13.3115 6.15692 13.0402 6.47506 12.4994 7.11035C11.3506 8.45948 9.41936 10.1668 7.00034 10.167C4.58109 10.167 2.64915 8.45957 1.50034 7.11035C0.959472 6.47506 0.688209 6.15692 0.671242 5.44824C0.654363 4.7393 0.894514 4.42789 1.37437 3.80664C2.40573 2.47145 4.23531 0.833008 7.00034 0.833008ZM7.00034 2.83301C5.52758 2.83301 4.33335 4.02724 4.33335 5.5C4.33335 6.97276 5.52758 8.16699 7.00034 8.16699C8.47288 8.16674 9.66636 6.9726 9.66636 5.5C9.66636 4.0274 8.47288 2.83326 7.00034 2.83301Z"
              fill="#757575"
            />
          </svg>
          {viewcount}
        </span>
      </div>
    </div>
  )
}
