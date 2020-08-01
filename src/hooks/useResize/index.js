import { useState, useCallback, useEffect } from 'react';

function useResize() {
  const getSize = useCallback((window) => {
    return {
      width: window ? window.innerWidth : undefined,
      height: window ? window.innerHeight : undefined,
    };
  }, []);

  const [windowSize, setWindowSize] = useState(getSize(window));

  //쓰로틀링과 디바운싱 resize시 성능 문제 발생
  //https://www.zerocho.com/category/JavaScript/post/59a8e9cb15ac0000182794fa
  const evtResize = useCallback(() => {
    setWindowSize(getSize(window));
  }, []);

  //단 한번만 event가 적용 되도록 수정
  useEffect(() => {
    let timer;
    window.addEventListener('resize', () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(function () {
        console.log('resize');
        evtResize(window);
      }, 50);
    });
  }, []);

  return windowSize;
}

export default useResize;
