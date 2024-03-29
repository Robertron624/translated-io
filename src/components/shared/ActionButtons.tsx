import React from "react";

import CopyIcon from "../../assets/images/Copy.svg";
import SoundMaxFill from "../../assets/images/sound_max_fill.svg";
import SortAlfa from "../../assets/images/Sort_alfa.svg";

import "./ActionButtons.scss";

interface Props {
  withTranslate: boolean;
  loading?: boolean;
  handleTranslateClick?: () => void;
  handleCopyClick: () => void;
  handleTextSpeech?: () => void;
}

function ActionButtons({
  withTranslate,
  loading,
  handleTranslateClick,
  handleCopyClick,
  handleTextSpeech,
}: Props): React.ReactElement {
  return (
    <div className='action-buttons'>
      <div className='left'>
        <button 
          className='audio'
          onClick={handleTextSpeech}
          title="Listen"
        >
          <img src={SoundMaxFill} alt='Audio' />
        </button>
        <button className='copy' onClick={handleCopyClick} title="Copy">
          <img src={CopyIcon} alt='Copy' />
        </button>
      </div>
      {withTranslate ? (
        <div className='right'>
          <button 
            onClick={handleTranslateClick}
            disabled={loading}
          >
            <img src={SortAlfa} alt='Sort' />
            {loading ? "Translating..." : "Translate"}
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default ActionButtons;
