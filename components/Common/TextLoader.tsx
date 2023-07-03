import Centered from '@/components/Centered';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const TextLoader = () => {
  const texts = [
    'Myślę nad najlepszą treścią dla Ciebie.',
    'Przygotowuję zestaw najlepszych odpowiedzi.',
    'Daj mi chwilę, żebym zapytał eksperta o radę...',
    'Jeszcze tylko łyczek kawy...',
    'Analizuję Twoje polecenie...',
    'Wyszukuję informacje w mojej bazie danych...',
    'Daj mi chwilę...',
    'Zbieram informacje z różnych źródeł...',
    'Dopasowuję najlepsze odpowiedzi...',
    'Weryfikuję informacje...',
    'Sprawdzam aktualne informacje...',
    'Poczekaj chwilę, przeglądam zasoby...',
    'Dobieram odpowiedzi na Twoje polecenie...',
    'Pracuję nad Twoją prośbą...',
    'Przeszukuję moją wiedzę...',
    'Poszukuję dodatkowych informacji...',
    'Sprawdzam poprawność danych...',
    'Wyszukuję informacje na ten temat...',
    'Badam temat, o który prosisz...',
    'Szukam najbardziej trafnych informacji...',
    'Analizuję zapytanie...',
    'Badam różne perspektywy...',
    'Sprawdzam różnorodne źródła...',
    'Gromadzę informacje z mojej bazy wiedzy...',
    'Szukam najlepszych źródeł informacji...',
    'Przygotowuję odpowiedzi na Twoje polecenie...',
    'Wszystko już prawie gotowe...',
    'Czytam na ten temat...',
    'Sprawdzam wszelkie możliwości...',
    'Zaraz coś wymyślę...',
    'Jeszcze momencik...',
    'Muszę to przemyśleć...',
    'Jeszcze chwila, warto poczekać...',
    'Proszę o trochę cierpliwości',
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex(Math.floor(Math.random() * texts.length));
    }, 2000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Centered>
      <Loader>{texts[currentIndex]}</Loader>
    </Centered>
  );
};

export default TextLoader;

const Loader = styled.div`
  color: black; 
  width: 15vw; 
  text-align: center;
  @media (max-width: 1023px) {
    width: 55vw; 
    margin-top: 1rem;
  }
`;
