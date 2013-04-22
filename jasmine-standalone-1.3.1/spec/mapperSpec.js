/**
 * Created with JetBrains WebStorm.
 * User: jola
 * Date: 4/21/13
 * Time: 12:02 AM
 * To change this template use File | Settings | File Templates.
 */
describe("Mapper", function() {
    //var searchCriteria;
    //var criteria;
    //var mapper =

    beforeEach(function() {
        //searchCriteria = { Criteria: { PropertyA: { Minimum: 10, Maximum: 20}, Year: 1000, Types: [1,2] }};
        //criteria = { Criteria: { PropertyAMin: 10, PropertyAMax: 20, Year: 1000, Types: [1,2] }};
    });

    it("should map criteria to searchCriteria", function() {
        var searchCriteria = { Criteria: { PropertyA: { Minimum: 10, Maximum: 20}, Year: 1000, Types: [1,2], SetTimeStamp: true }};
        var criteria = { Criteria: { PropertyAMin: 10, PropertyAMax: 20, Year: 1000, Types: [1,2], TimeStamp: 'aaa' }};

        var config = { 'Criteria.Year': { to: 'Criteria.Year' },
            'Criteria.Types': { to: 'Criteria.Types' },
            'Criteria.PropertyA.Minimum': { to: 'Criteria.PropertyAMin' },
            'Criteria.PropertyA.Maximum': { to: 'Criteria.PropertyAMax' },
            'Criteria.TimeStamp': { to: 'Criteria.TimeStamp', converter: function(val, obj) {
                if (obj.Criteria.SetTimeStamp) {
                    if (!val) {
                        return 'aaa';
                    }
                    else {
                        return val;
                    }
                }
                return null;
                }
            },
            'OtherCriteria.Types': { to: 'OtherCriteria.Types' },
            'YetOtherCriteria.Types': { to: 'YetOtherCriteria.Types' }
        };
        var mapper = new Mapper(config);
        var mapped = {};
        mapper.map(searchCriteria, mapped, "Criteria.");
        expect(mapped).toEqual(criteria);

        mapped = {};
        mapper.map(searchCriteria, mapped, "Criteria.");
        expect(mapped).toEqual(criteria);

        var reversedMapper = new Mapper();
        reversedMapper.config = { 'Criteria.Year': { to: 'Criteria.Year' },
            'Criteria.Types': { to: 'Criteria.Types' },
            'Criteria.PropertyAMin': { to: 'Criteria.PropertyA.Minimum' },
            'Criteria.PropertyAMax': { to: 'Criteria.PropertyAMaximum' }
        };
        var reversed = {};
        reversedMapper.map(criteria, reversed);
        expect(reversed, searchCriteria);
    });

    it("should map criteria to searchCriteria 2", function() {
        var searchCriteria = { Criteria: { PropertyA: { Minimum: 10}, Year: 1000, Types: [1,2] }};
        var criteria = { Criteria: { PropertyAMin: 10, Year: 1000, Types: [1,2] }};

        var config = { 'Criteria.Year': { to: 'Criteria.Year' },
            'Criteria.Types': { to: 'Criteria.Types' },
            'Criteria.PropertyA.Minimum': { to: 'Criteria.PropertyAMin' },
            'Criteria.PropertyA.Maximum': { to: 'Criteria.PropertyAMax' }
        };

        var mapper = new Mapper(config);
        var mapped = {};
        mapper.map(searchCriteria, mapped);
        expect(mapped).toEqual(criteria);

        var reversedMapper = new Mapper();
        reversedMapper.config = { 'Criteria.Year': { to: 'Criteria.Year'},
            'Criteria.Types': { to: 'Criteria.Types' },
            'Criteria.PropertyAMin': { to: 'Criteria.PropertyA.Minimum' },
            'Criteria.PropertyAMax': { to: 'Criteria.PropertyAMaximum' }
        };
        var reversed = {};
        reversedMapper.map(criteria, reversed);
        expect(reversed, searchCriteria);
    });
});
