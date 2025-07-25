import Input from './common/Input'
import S from './SearchBar.module.css'
import search from '../assets/icon/search.svg'
import RadioGroup from './common/RadioGroup'

export const SearchBar = () => {
  return (
    <div className={S.container}>
      <div className={S.filters}>
        <div className={S.container2}>
          <select className={S.select}>
            <option>경력 수준</option>
            <option>신입</option>
            <option>경력</option>
          </select>
          <div className={S.searchBar}>
            <Input
              type="text"
              placeholder="포트폴리오 검색"
              className={S.searchInput}
            />
            <button
              type="button"
              className={S.searchIcon}>
              <img
                src={search}
                alt="검색 아이콘"
              />
            </button>
          </div>
        </div>

        <RadioGroup
          label={'지원 분야'}
          options={[
            { label: '전체', value: 'all' },
            { label: '프론트엔드 개발자', value: 'frontend' },
            { label: '백엔드 개발자', value: 'backend' },
            { label: '모바일 개발자', value: 'mobile' },
            { label: '웹 디자이너', value: 'design' }
          ]}
          name={'searchField'}
          className={S.radioGroup}
          checked={'all'}
          onChange={() => {}}
        />
      </div>
    </div>
  )
}
