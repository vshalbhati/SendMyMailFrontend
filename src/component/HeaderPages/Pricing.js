import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const PricingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem 2rem;
`;

const Subheader = styled.h2`
  font-size: 1.5rem;
  color: white;
  margin-bottom: 2rem;
  text-align: center;
`;

const PricingCard = styled.div`
  background-color: #ff5757;
  border-radius: 10px;
  width: 100%;
  max-width: 500px;
  text-align: center;
  height:400px;
`;

const PriceTag = styled.h3`
  font-size: 3rem;
  color: white;
  margin-bottom: 1rem;
`;

const FeatureList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-bottom: 2rem;
`;

const Feature = styled.li`
  margin-bottom: 0.5rem;
  color: white;
`;

const CTAButton = styled.button`
  background-color: white;
  color: #ff5757;
  border: none;
  border-radius: 5px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff5757;
    color:white;
  }
`;

const Pricing = () => {
    const navigate = useNavigate();
    const handleClick =()=>{
        navigate('/')
    }
  return (
    <PricingContainer>
      <Subheader>
        We're excited to offer our application completely free for a limited time!
      </Subheader>
      <PricingCard>
        <PriceTag>$0</PriceTag>
        <FeatureList>
          <Feature>✅ Full access to all features</Feature>
          <Feature>✅ Unlimited usage</Feature>
          <Feature>✅ Priority support</Feature>
          <Feature>✅ Regular updates</Feature>
        </FeatureList>
        <CTAButton onClick={handleClick}>Get Started Now</CTAButton>
      </PricingCard>
    </PricingContainer>
  );
};

export default Pricing;