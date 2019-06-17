import chai,{expect} from "chai";
import chaiAlmost from "chai-almost";
chai.use(chaiAlmost());
import {zeros,rand,eye} from "../src/create";
import {diag,reshape,swapCols,swapRows} from "../src/manipulations";
import {sum} from "../src/operations";

function *skip(iter,N){
  let n=0;
  for(let i of iter){
    if (!n){
      n=N;
      yield i;
    }
    n--;
  }
}

describe('diag',function(){
  it('converts a square matrix to a column vector of the diagonal',function(){
    const m=rand(10);
    const v=diag(m);
    expect(v.size).to.eql([10,1]);
    expect([...v]).to.eql([...skip(m,11)]);
  });
  it('converts a column vector into a square matrix with the set diagonal',function(){
    const v=rand(10,1);
    const m=diag(v);
    expect(m.size).to.eql([10,10]);
    expect([...v]).to.eql([...skip(m,11)]);
    expect(sum(v)).to.almost.equal(sum(m));
  });
  it('deals with wide or tall matrices',function(){
    expect(diag(zeros(10,5)).size).to.eql([5,1]);
    expect(diag(zeros(10,20)).size).to.eql([10,1]);
  })
});

describe('reshape',function(){
  it('changes the shape of a matrix, retaining the row-major element order',function(){
    const m=rand(10);
    expect([...reshape(m,5,20)]).to.eql([...m]);
    expect([...reshape(m.t,5,20)]).to.not.eql([...m]);
  })
});

describe('swapRows',function(){
  it('exchanges a set of rows',function(){
    const m=eye(4);
    m.set(0,3,1);
    expect([...swapRows(m,0,3)]).to.eql([0,0,0,1, 0,1,0,0, 0,0,1,0, 1,0,0,1]);
  })
});

describe('swapCols',function(){
  it('exchanges a set of columns',function(){
    const m=eye(4);
    m.set(0,3,1);
    expect([...swapCols(m,0,3)]).to.eql([1,0,0,1, 0,1,0,0, 0,0,1,0, 1,0,0,0]);
  })
});