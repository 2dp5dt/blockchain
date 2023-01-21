
interface IFactory{
        function getPairAddress(address token1, address token2) external view returns(address);
}